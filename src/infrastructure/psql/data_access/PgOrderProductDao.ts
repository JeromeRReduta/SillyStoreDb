/* eslint-disable @typescript-eslint/no-unused-vars */
import PG, { Client, Pool, QueryConfig } from "pg";
import { ICreateOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrderProductsRequest.ts";
import { IGetOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IUpdateOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateOrderProductRequest.ts";
import { IOrderProductResponse } from "../../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IOrderProductDao } from "../../data_access/IOrderProductDao.ts";
import { IProductWithQuantityResponse } from "../../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";
import PgDaos from "../../data_access/PgDaos.ts";

export default class PgOrderProductDao implements IOrderProductDao {
    private db: Client | Pool;

    constructor(db: Client | Pool) {
        this.db = db;
    }

    async createAsync({
        orderId,
        productId,
        quantity,
    }: ICreateOrderProductRequest): Promise<IOrderProductResponse> {
        const sql: QueryConfig = {
            text: `
                INSERT INTO orders_products (order_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            values: [orderId, productId, quantity],
        };
        const rows: IOrderProductResponse[] = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.orderProductMapper,
        );
        if (rows.length !== 1) {
            throw new Error("Error - only 1 entry should have been created!");
        }
        return rows[0];
    }

    async getAllAsync(
        _dto: IGetAllOrderProductsRequest,
    ): Promise<IOrderProductResponse[]> {
        throw new Error("Method not implemented.");
    }

    async getAsync(
        _dto: IGetOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async updateAsync(
        _dto: IUpdateOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        _dto: IDeleteOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getOrdersIncludingProductAsync({
        productId,
        userId,
    }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
        const isClient: boolean = userId !== null;
        const sql: QueryConfig = {
            text: `
                SELECT o.* FROM orders_products AS op
                JOIN orders AS o
                    ON op.order_id = o.id
                WHERE op.product_id = $1
                    ${isClient ? "AND user_id = $2" : ""}
            `,
            values: isClient ? [productId, userId] : [productId],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    }

    async getProductsInOrderAsync({
        orderId,
    }: IGetProductsInOrderRequest): Promise<IProductResponse[]> {
        const sql: QueryConfig = {
            text: `
            SELECT p.* FROM orders_products AS op
            JOIN products AS p
                ON op.product_id = p.id
            WHERE op.order_id = $1
        `,
            values: [orderId],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.productMapper);
    }

    async getProductsWithQuantitiesAsync({
        orderId,
    }: IGetProductsInOrderRequest): Promise<IProductWithQuantityResponse[]> {
        const sql: QueryConfig = {
            text: `
            SELECT p.*, op.quantity FROM orders_products AS op
            JOIN products AS p
                ON op.product_id = p.id
            WHERE op.order_id = $1
        `,
            values: [orderId],
        };
        return await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.productWithQuantityMapper,
        );
    }
}
