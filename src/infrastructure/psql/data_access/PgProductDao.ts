import { Client, Pool, QueryConfig } from "pg";
import { ICreateProductRequest } from "../../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../application/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../application/dtos/responses/IProductResponse.ts";
import { IProductDao } from "./IProductDao.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgUser } from "../entities/IPgUser.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";
import { IPgProduct } from "../entities/IPgProduct.ts";

export default class PgProductDao implements IProductDao {
    private db: Client | Pool;
    private dataMapper: IDataMapper<IPgProduct, IProductResponse>;

    constructor(
        db: Client | Pool,
        dataMapper: IDataMapper<IPgProduct, IProductResponse>,
    ) {
        this.db = db;
        this.dataMapper = dataMapper;
    }

    async createAsync(dto: ICreateProductRequest): Promise<IProductResponse> {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllAsync(
        _dto: IGetAllProductsRequest,
    ): Promise<IProductResponse[]> {
        const sql: QueryConfig = {
            // thanks https://www.postgresql.org/docs/9.4/datatype-money.html
            text: `
                SELECT
                    id,
                    title,
                    description,
                    price::decimal::float8
                FROM products
                `,
        };
        logger.debug("sql: ", sql);
        const { rows } = await this.db.query(sql);
        logger.debug("result: ", rows);
        logger.debug("type of rounded price is", typeof rows[0].price);
        return rows.map(this.dataMapper);
    }
    async getAsync(dto: IGetProductRequest): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(
        dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }
}
