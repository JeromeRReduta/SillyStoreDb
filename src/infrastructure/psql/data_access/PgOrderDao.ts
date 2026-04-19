import { Client, Pool, QueryConfig } from "pg";

import { IOrderDao } from "../../data_access/IOrderDao.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgOrder } from "../entities/IPgOrder.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { ICreateOrderRequest } from "../../../../SillyStoreCommon/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../../SillyStoreCommon/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetOrderRequest.ts";
import { IOrderResponse } from "../../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";

export default class PgOrderDao implements IOrderDao {
    private db: Client | Pool;
    private dataMapper: IDataMapper<IPgOrder, IOrderResponse>;

    constructor(
        db: Client | Pool,
        dataMapper: IDataMapper<IPgOrder, IOrderResponse>,
    ) {
        this.db = db;
        this.dataMapper = dataMapper;
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
                    id,
                    TO_CHAR(date, 'yyyy-mm-dd') AS date,
                    user_id
            `,
            values: [dateStr, userId],
        };
        backendLogger.debug("sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        backendLogger.debug("result: ", row);
        return this.dataMapper(row);
    }
    async getAllAsync({
        userId,
    }: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        const isClient: boolean = userId !== null;
        const sql: QueryConfig = {
            text: `
                SELECT                  
                    id,
                    TO_CHAR(date, 'yyyy-mm-dd') AS date,
                    user_id
                FROM orders
                ${isClient ? "WHERE user_id = $1" : ""}
            `,
            values: isClient ? [userId] : [],
        };
        backendLogger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        backendLogger.debug("result: ", rows);
        return rows.map(this.dataMapper);
    }

    async getAsync({
        orderId,
    }: IGetOrderRequest): Promise<IOrderResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT 
                    id,
                    TO_CHAR(date, 'yyyy-mm-dd') AS date,
                    user_id
                FROM orders
                WHERE id = $1
            `,
            values: [orderId],
        };
        backendLogger.debug("sql", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        backendLogger.debug("result: ", row);
        return row ? this.dataMapper(row) : null;
    }
    async deleteAsync(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }
}
