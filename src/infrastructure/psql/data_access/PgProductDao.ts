/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client, Pool, QueryConfig } from "pg";
import {
    ICreateProductRequest,
    IProductResponse,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
} from "../../../../SillyStoreCommon/dtos/productDtos.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { IProductDao } from "../../data_access/IProductDao.ts";
import PgDaos from "../../data_access/PgDaos.ts";

export default class PgProductDao implements IProductDao {
    private db: Client | Pool;
    private formattedProductSql: string;

    constructor(db: Client | Pool) {
        this.db = db;
        this.formattedProductSql = `
            id,
            title,
            description,
            price::decimal::float8
        `;
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
                    ${this.formattedProductSql}
                FROM products
                `,
        };
        return PgDaos.queryAsync(this.db, sql, PgDaos.productMapper);
    }

    async getAsync({
        id,
    }: IGetProductRequest): Promise<IProductResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT
                    ${this.formattedProductSql}
                FROM products
                WHERE id = $1
            `,
            values: [id],
        };
        const rows = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.productMapper,
        );
        backendLogger.debug("# of matching entries: ", rows.length);
        return rows.length > 0 ? rows[0] : null;
    }

    async updateAsync(
        _dto: IUpdateProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        _dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }
}
