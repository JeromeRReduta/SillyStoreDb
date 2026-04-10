import { Client, Pool, QueryConfig } from "pg";
import { ICreateOrderRequest } from "../../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../../application/dtos/requests/IGetOrderRequest.ts";
import { IOrderResponse } from "../../../application/dtos/responses/IOrderResponse.ts";
import { IOrderDao } from "../../data_access/IOrderDao.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgOrder } from "../entities/IPgOrder.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

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
                RETURNING *
            `,
            values: [dateStr, userId],
        };
        logger.debug("sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result: ", row);
        return this.dataMapper(row);
    }
    async getAllAsync({
        userId,
    }: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        const isClient: boolean = userId !== null;
        const sql: QueryConfig = {
            text: `
                SELECT * FROM orders
                ${isClient ? "WHERE user_id = $1" : ""}
            `,
            values: isClient ? [userId] : [],
        };
        logger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        logger.debug("result: ", rows);
        return rows.map(this.dataMapper);
    }

    async getAsync({
        orderId,
    }: IGetOrderRequest): Promise<IOrderResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * from orders
                WHERE id = $1
            `,
            values: [orderId],
        };
        logger.debug("sql", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result: ", row);
        return row ? this.dataMapper(row) : null;
    }
    async deleteAsync(
        dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }
}
