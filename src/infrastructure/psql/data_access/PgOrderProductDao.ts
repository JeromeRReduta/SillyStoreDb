import { Client, Pool, Query, QueryConfig } from "pg";
import { ICreateOrderProductRequest } from "../../../application/dtos/requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../../application/dtos/requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../../application/dtos/requests/IGetAllOrderProductsRequest.ts";
import { IGetOrderProductRequest } from "../../../application/dtos/requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../application/dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../../application/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../application/dtos/responses/IProductResponse.ts";
import { IOrderProductDao } from "../../data_access/IOrderProductDao.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgOrder } from "../entities/IPgOrder.ts";
import { IPgOrderProduct } from "../entities/IPgOrderProduct.ts";
import { IPgProduct } from "../entities/IPgProduct.ts";

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
        logger.debug("sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result: ", row);
        return this.orderProductMapper(row);
    }

    getAllAsync(
        dto: IGetAllOrderProductsRequest,
    ): Promise<IOrderProductResponse[]> {
        throw new Error("Method not implemented.");
    }

    getAsync(
        dto: IGetOrderProductRequest,
    ): Promise<IOrderProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    deleteAsync(
        dto: IDeleteOrderProductRequest,
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
        logger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        logger.debug("Result: ", rows);
        return rows.map(this.orderMapper);
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
        logger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        logger.debug("result: ", rows);
        return rows.map(this.productMapper);
    }
}
