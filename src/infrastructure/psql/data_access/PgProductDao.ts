/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Pool, QueryConfig } from "pg";
import { ICreateProductRequest } from "../../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { IProductDao } from "../../data_access/IProductDao.ts";
import { IPgProduct } from "../entities/IPgProduct.ts";
import { IUpdateProductRequest } from "../../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateProductRequest.ts";
import PgDaos from "../../data_access/PgDaos.ts";

export default class PgProductDao implements IProductDao {
    private db: Client | Pool;

    constructor(db: Client | Pool) {
        this.db = db;
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
        return PgDaos.queryAsync(this.db, sql, PgDaos.productMapper);
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
        const rows = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.productMapper,
        );
        backendLogger.debug("# of matching entries: ", rows.length);
        return rows.length > 0 ? rows[0] : null;
    }

    async updateAsync(
        dto: IUpdateProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        _dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }
}
