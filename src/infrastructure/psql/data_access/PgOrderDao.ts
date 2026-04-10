import { Client, Pool } from "pg";
import { ICreateOrderRequest } from "../../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../../application/dtos/requests/IGetOrderRequest.ts";
import { IOrderResponse } from "../../../application/dtos/responses/IOrderResponse.ts";
import { IOrderDao } from "../../data_access/IOrderDao.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgOrder } from "../entities/IPgOrder.ts";

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
    async getAllAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        throw new Error("Method not implemented.");
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
