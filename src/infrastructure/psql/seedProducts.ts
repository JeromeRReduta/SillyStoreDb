import { Client, QueryConfig } from "pg";
import { Quantities } from "./seed.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default async function seedProducts(
    db: Client,
    { products }: Quantities,
): Promise<void> {
    for (let i = 1; i < products + 1; i++) {
        const title: string = `title ${i}`;
        const description: string = `description ${i}`;
        const price: number = i * 1.11;
        const sql: QueryConfig = {
            text: `
            INSERT INTO products (title, description, price)
            VALUES ($1, $2, $3)
            RETURNING *`,
            values: [title, description, price],
        };
        logger.debug("running sql: ", sql);
        const {
            rows: [pgProduct],
        } = await db.query(sql);
        logger.debug("result", pgProduct);
    }
}
