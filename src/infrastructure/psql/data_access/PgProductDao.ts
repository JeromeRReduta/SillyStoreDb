/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Pool, QueryConfig } from "pg";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { ICreateProductRequest } from "../../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../application/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../application/dtos/responses/IProductResponse.ts";
import { IPgProduct } from "../entities/IPgProduct.ts";
import { IProductDao } from "../../data_access/IProductDao.ts";

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

    async createAsync(_dto: ICreateProductRequest): Promise<IProductResponse> {
        throw new Error("Method not implemented.");
    }

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
        return rows.map(this.dataMapper);
    }

    async getAsync({
        id,
    }: IGetProductRequest): Promise<IProductResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT
                    id,
                    title,
                    description,
                    price::decimal::float8
                FROM products
                WHERE id = $1
            `,
            values: [id],
        };
        logger.debug("sql:", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result: ", row);
        return row ? this.dataMapper(row) : null;
    }

    async deleteAsync(
        _dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }
}
