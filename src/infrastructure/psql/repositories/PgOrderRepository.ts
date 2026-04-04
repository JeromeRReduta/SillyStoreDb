import { QueryConfig, type Client } from "pg";
import { type CreateOrderRequest } from "../../../../SillyStoreCommon/requests/CreateOrderRequest.ts";
import type OrderRepository from "../../../domain/repositories/OrderRepository.ts";
import { type GetOrderDetailsRequest } from "../dtos/requests/GetOrderDetailsRequest.ts";
import { type OrderResponse } from "../dtos/responses/OrderResponse.ts";
import { type PgDtoMapper } from "../dtos/mapping/PgDtoMapper.ts";
import { type PgOrder } from "../entities/PgOrder.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

export default class PgOrderRepository implements OrderRepository {
    private db: Client;
    private ordersDbName: string;
    private ordersProductsDbName: string;
    private dataMapper: PgDtoMapper<PgOrder, OrderResponse>;

    constructor({
        db,
        ordersDbName,
        ordersProductsDbName,
        dataMapper,
    }: {
        db: Client;
        ordersDbName: string;
        ordersProductsDbName: string;
        dataMapper: PgDtoMapper<PgOrder, OrderResponse>;
    }) {
        this.db = db;
        this.ordersDbName = ordersDbName;
        this.ordersProductsDbName = ordersProductsDbName;
        this.dataMapper = dataMapper;
    }

    async getAllAsync(userId: number): Promise<OrderResponse[]> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.ordersDbName}
                WHERE user_id = $1
            `,
            values: [userId],
        };
        logger.debug("Running sql: ", sql);
        const pgOrders: PgOrder[] = (await this.db.query(sql)).rows;
        logger.debug("Result:", pgOrders);
        return pgOrders.map(this.dataMapper.apply);
    }

    async getByIdAsync(orderId: number): Promise<OrderResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.ordersDbName}
                WHERE id = $1
            `,
            values: [orderId],
        };
        logger.debug("Running sql: ", sql);
        const pgOrder: PgOrder | undefined = (await this.db.query(sql)).rows[0];
        if (!pgOrder) {
            logger.debug("No match found!");
            return null;
        }
        return this.dataMapper.apply(pgOrder);
    }

    async getProductsInOrderAsync(
        // TODO: wait, this should be in products repo
        orderId: number,
    ): Promise<OrderResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.ordersProductsDbName} AS op
                JOIN
            `,
        };
    }

    async createAsync({
        userId,
        dateStr,
    }: CreateOrderRequest): Promise<OrderResponse> {
        const sql: QueryConfig = {
            text: `
                INSERT INTO ${this.ordersDbName} (user_id, date)
                VALUES ($1, $2)
                RETURNING *
            `,
            values: [userId, dateStr],
        };
        logger.debug("Running sql: ", sql);
        const created: PgOrder = (await this.db.query(sql)).rows[0]!; // note: this WILL throw an error if db call fails, instead of returning undef - so don't have to check for undef
        logger.debug("Result:", created);
        return this.dataMapper.apply(created);
    }
    // async getProductsInOrderAsync({
    //     userId,
    //     orderId,
    // }: GetOrderDetailsRequest): Promise<OrderResponse | null> {
    //     throw new Error("Method not implemented.");
    // }
}
