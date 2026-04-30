/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client, Pool, QueryConfig } from "pg";
import {
    ICartItemResponse,
    IDeleteCartItemRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IGetOrdersIncludingProductRequest,
    IGetPendingCartItemsRequest,
    IMergeCartItemsRequest,
    IMergePendingCartItemsRequest,
    IUpdateCartItemRequest,
} from "../../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import { IOrderResponse } from "../../../../SillyStoreCommon/dtos/orderDtos.ts";
import {
    IProductResponse,
    IProductWithQuantityResponse,
} from "../../../../SillyStoreCommon/dtos/productDtos.ts";
import { ICartItemDao } from "../../data_access/ICartItemDao.ts";
import PgDaos from "../../data_access/PgDaos.ts";
import { ICartItem } from "../../../../SillyStoreCommon/domain-objects/CartItem.ts";
import HttpError from "../../../errors/HttpError.ts";

export default class PgCartItemDao implements ICartItemDao {
    private db: Client | Pool;
    private formattedOrderSql: string;

    constructor(db: Client | Pool) {
        this.db = db;
        this.formattedOrderSql = `
            id,
            TO_CHAR(date, 'yyyy-mm-dd') AS date,
            user_id,
            status
        `;
    }

    async createAsync({
        orderId,
        productId,
        quantity,
    }: ICartItem): Promise<ICartItem> {
        const sql: QueryConfig = {
            text: `
                INSERT INTO cart_items (order_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            values: [orderId, productId, quantity],
        };
        const rows: ICartItemResponse[] = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.orderProductMapper, // TODO - change to cartitemresponse mapper
        );
        if (rows.length !== 1) {
            throw new Error("Error - only 1 entry should have been created!");
        }
        return rows[0];
    }
    async getAllAsync(_dto: IGetAllCartItemsRequest): Promise<ICartItem[]> {
        throw new Error("Method not implemented.");
    }
    async getAsync(_dto: IGetCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }
    async updateAsync(_dto: IUpdateCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(_dto: IDeleteCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }

    async getAllPendingCartItemsAsync(
        dto: IGetPendingCartItemsRequest,
    ): Promise<IProductWithQuantityResponse[]> {
        throw new Error("Method not implemented.");
    }
    async mergeCartItemsAsync(
        dto: IMergeCartItemsRequest,
    ): Promise<ICartItemResponse[]> {
        throw new Error("Method not implemented.");
    }
    async mergePendingCartItemsAsync(
        dto: IMergePendingCartItemsRequest,
    ): Promise<ICartItemResponse[]> {
        throw new Error("Method not implemented.");
    }

    async getOrdersIncludingProductAsync({
        productId,
        creatorId,
        role,
    }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
        const isInvalid: boolean = role === "client" && creatorId === undefined;
        if (isInvalid) {
            throw new HttpError(
                400,
                "Bad request - need to either be admin or provide a creator id!",
            );
        }
        const sql: QueryConfig = {
            text: `
                SELECT ${this.formattedOrderSql} FROM cart_items AS c
                JOIN orders AS o
                    ON c.order_id = o.id
                WHERE c.product_id = $1
                    ${role === "client" ? "AND creator_id = $2" : ""}
            `,
            values: role === "client" ? [productId, creatorId] : [productId],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    }
    // async getOrdersIncludingProductAsync({
    //     productId,
    //     userId,
    // }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
    //     const isClient: boolean = userId !== null;
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT o.* FROM orders_products AS op
    //             JOIN orders AS o
    //                 ON op.order_id = o.id
    //             WHERE op.product_id = $1
    //                 ${isClient ? "AND user_id = $2" : ""}
    //         `,
    //         values: isClient ? [productId, userId] : [productId],
    //     };
    //     return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    // }

    // async getProductsInOrderAsync({
    //     orderId,
    // }: IGetProductsInOrderRequest): Promise<IProductResponse[]> {
    //     const sql: QueryConfig = {
    //         text: `
    //         SELECT p.* FROM orders_products AS op
    //         JOIN products AS p
    //             ON op.product_id = p.id
    //         WHERE op.order_id = $1
    //     `,
    //         values: [orderId],
    //     };
    //     return await PgDaos.queryAsync(this.db, sql, PgDaos.productMapper);
    // }

    // async getProductsWithQuantitiesInPendingOrderAsync({
    //     userId,
    // }: IGetProductsInOrderRequest): Promise<IProductWithQuantityResponse[]> {
    //     const isClient: boolean = userId !== null;
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT p.*, op.quantity FROM orders_products AS op
    //             JOIN products AS p
    //                 ON op.product_id = p.id
    //             JOIN orders AS o
    //                 ON op.order_id = o.id
    //             WHERE o.status = 'pending'
    //                 ${isClient ? "AND o.user_id = $1" : ""}
    //         `,
    //         values: isClient ? [userId] : [],
    //     };
    //     return await PgDaos.queryAsync(
    //         this.db,
    //         sql,
    //         PgDaos.productWithQuantityMapper,
    //     );
    // }
}
