import { Client, Pool, QueryConfig } from "pg";
import {
    ICreateOrderRequest,
    IOrderResponse,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IUpdateOrderRequest,
    IDeleteOrderRequest,
    IGetAllPendingOrdersRequest,
} from "../../../../SillyStoreCommon/dtos/orderDtos.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { IOrderDao } from "../../data_access/IOrderDao.ts";
import PgDaos from "../../data_access/PgDaos.ts";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class PgOrderDao implements IOrderDao {
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
        dateStr,
        userId,
    }: ICreateOrderRequest): Promise<IOrderResponse> {
        const sql: QueryConfig = {
            text: `
                INSERT INTO orders (date, user_id)
                VALUES ($1, $2)
                RETURNING
                    $3
            `,
            values: [dateStr, userId, this.formattedOrderSql],
        };
        const rows: IOrderResponse[] = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.orderMapper,
        );
        if (rows.length !== 1) {
            throw new Error("Error - only 1 entry should have been created!");
        }
        return rows[0];
    }

    async getAllAsync({
        userId,
    }: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        const isClient: boolean = userId !== null;
        const sql: QueryConfig = {
            text: `
                SELECT
                ${this.formattedOrderSql}
                FROM orders
                ${isClient ? "WHERE user_id = $1" : ""}
            `,
            values: isClient ? [userId] : [],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    }

    async getAsync({ id }: IGetOrderRequest): Promise<IOrderResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT
                ${this.formattedOrderSql}
                FROM orders
                WHERE id = $1
            `,
            values: [id],
        };
        const rows: IOrderResponse[] = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.orderMapper,
        );
        backendLogger.debug("# of matching entries: ", rows.length);
        return rows.length > 0 ? rows[0] : null;
    }

    async updateAsync(
        _dto: IUpdateOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        _dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getAllPendingOrdersAsync({
        userId,
    }: IGetAllPendingOrdersRequest): Promise<IOrderResponse[]> {
        const isClient: boolean = userId !== null;
        const sql: QueryConfig = {
            text: `
                SELECT
                    ${this.formattedOrderSql}
                FROM orders
                WHERE
                    status = 'pending'
                    ${isClient ? "AND user_id = $1" : ""}
            `,
            values: isClient ? [userId] : [],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    }
}
