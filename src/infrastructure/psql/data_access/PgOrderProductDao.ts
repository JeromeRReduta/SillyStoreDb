/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Pool, QueryConfig } from "pg";
import { ICreateOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetAllOrderProductsRequest.ts";
import { IGetOrderProductRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { IOrderProductDao } from "../../data_access/IOrderProductDao.ts";
import { IPgOrder } from "../entities/IPgOrder.ts";
import { IPgOrderProduct } from "../entities/IPgOrderProduct.ts";
import { IPgProduct } from "../entities/IPgProduct.ts";
import { IGetAllPendingOrdersRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetAllPendingOrdersRequest.ts";

export default class PgOrderProductDao implements IOrderProductDao {
    private db: Client | Pool;
    private orderMapper: IDataMapper<IPgOrder, IOrderResponse>;
    private productMapper: IDataMapper<IPgProduct, IProductResponse>;
    private orderProductMapper: IDataMapper<
        IPgOrderProduct,
        IOrderProductResponse
    >;

    constructor({
        db,
        orderMapper,
        productMapper,
        orderProductMapper,
    }: {
        db: Client | Pool;
        orderMapper: IDataMapper<IPgOrder, IOrderResponse>;
        productMapper: IDataMapper<IPgProduct, IProductResponse>;
        orderProductMapper: IDataMapper<IPgOrderProduct, IOrderProductResponse>;
    }) {
        this.db = db;
        this.orderMapper = orderMapper;
        this.productMapper = productMapper;
        this.orderProductMapper = orderProductMapper;
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
        backendLogger.debug("sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        backendLogger.debug("result: ", row);
        return this.orderProductMapper(row);
    }

    getAllAsync(
        _dto: IGetAllOrderProductsRequest,
    ): Promise<IOrderProductResponse[]> {
        throw new Error("Method not implemented.");
    }

    getAsync(
        _dto: IGetOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    deleteAsync(
        _dto: IDeleteOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getOrdersIncludingProductAsync({
        productId,
        userId,
    }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
        const sql: QueryConfig = {
            text: `
                SELECT o.* FROM orders_products AS op
                JOIN orders AS o
                    ON op.order_id = o.id
                WHERE op.product_id = $1
            `,
            values: [productId],
        };
        const isAdmin: boolean = userId === null;
        if (!isAdmin) {
            sql.text += "\nAND o.user_id = $2";
            sql.values!.push(userId);
        }
        backendLogger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        backendLogger.debug("Result: ", rows);
        return rows.map(this.orderMapper);
    }

    async getProductsInOrderAsync({
        orderId,
        includingQuantities,
    }: IGetProductsInOrderRequest): Promise<IProductResponse[]> {
        const selected: string = includingQuantities
            ? "p.*, op.quantity"
            : "p.*";
        const sql: QueryConfig = {
            text: `
            SELECT ${selected} FROM orders_products AS op
            JOIN products AS p
                ON op.product_id = p.id
            WHERE op.order_id = $1
        `,
            values: [orderId],
        };
        backendLogger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        backendLogger.debug("result: ", rows);
        return includingQuantities
            ? rows.map((row) => {
                  return { ...this.productMapper(row), quantity: row.quantity };
              })
            : rows.map(this.productMapper);
    }

    async getProductsInCartAsync({
        userId,
    }: IGetAllPendingOrdersRequest): Promise<IProductResponse[]> {
        const sql: QueryConfig = {
            text: `
                SELECT p.*, op.quantity FROM orders_products AS op
                JOIN products AS p
                    ON op.product_id = p.id
                JOIN orders AS o
                    ON op.order_id = o.id
                WHERE
                    o.status = 'pending'
                    AND o.user_id = $1
            `,
            values: [userId],
        };
        backendLogger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        backendLogger.debug("result: ", rows);
        return rows.map((row) => {
            return { ...this.productMapper(row), quantity: row.quantity };
        });
    }

    //     async getAllPendingOrdersAsync({
    //     userId,
    // }: IGetAllPendingOrdersRequest): Promise<IOrderResponse[]> {
    //     const isClient: boolean = userId !== null;
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT
    //                 id,
    //                 TO_CHAR(date, 'yyyy-mm-dd') AS date,
    //                 user_id,
    //                 status
    //             FROM orders
    //             WHERE
    //                 status = 'pending'
    //                 ${isClient ? "AND user_id = $1" : ""}
    //         `,
    //         values: isClient ? [userId] : [],
    //     };

    //     //             const sql: QueryConfig = {
    //     //         text: `
    //     //             SELECT
    //     //                 id,
    //     //                 TO_CHAR(date, 'yyyy-mm-dd') AS date,
    //     //                 user_id
    //     //             FROM orders
    //     //             ${isClient ? "WHERE user_id = $1" : ""}
    //     //         `,
    //     //         values: isClient ? [userId] : [],
    //     //     };
    //     backendLogger.debug("sql: ", sql);
    //     const { rows } = await this.db.query(sql);
    //     backendLogger.debug("result: ", rows);
    //     return rows.map(this.dataMapper);
    // }
}
