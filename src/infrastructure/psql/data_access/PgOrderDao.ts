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

    async createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse> {
        throw new Error("Method not implemented.");
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
    async getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(
        dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }
}
