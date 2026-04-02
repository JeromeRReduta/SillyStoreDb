import type { Client, QueryConfig } from "pg";
import { type Order } from "../../../../SillyStoreCommon/domain-objects/Order.ts";
import { type Product } from "../../../../SillyStoreCommon/domain-objects/Product.ts";
import type ProductRepository from "../../../domain/repositories/ProductRepository.ts";
import pgToDomainMapper from "../db_to_domain_mapping/PgToDomainMapper.ts";
import { PgProduct } from "../entities/PgProduct.ts";

export default class PgProductRepository implements ProductRepository {
    private readonly db: Client;
    private readonly dbName: string;

    constructor(db: Client, dbName: string) {
        this.db = db;
        this.dbName = dbName;
    }

    async getAllAsync(): Promise<Product[] | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.dbName} 
            `,
        };
        const rows: PgProduct[] | undefined = (await this.db.query(sql)).rows;
        return rows ? rows.map(pgToDomainMapper.toProduct) : null;
    }
    async getByIdAsync(id: number): Promise<Product | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.dbName}
                WHERE id = $1 
            `,
            values: [id],
        };
        const row: PgProduct | undefined = (await this.db.query(sql)).rows[0];
        return row ? pgToDomainMapper.toProduct(row) : null;
    }
    async getOrdersIncludingProductAsync(
        // TODO: architecture is wrong - need to look up how DTOs work again
        // Need to think abt which info is needed to make a db call & where
        // that info is positioned in pres layer, use case layer, infrastruct layer, domain layer
        productId: number,
    ): Promise<Order[] | null> {
        throw new Error("Method not implemented.");
    }
    /** TODO: stub */
}
