import { Client, QueryConfig } from "pg";
import { Quantities } from "./seed.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default async function seedProducts(
    db: Client,
    { products }: Quantities,
): Promise<void> {
    for (let i = 0; i < products; i++) {
        const title: string = `title ${i}`;
        const description: string = `description ${i}`;
        const price: number = i * 1.11;
        const imageSrc: string =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9zNEFuiVMZy-moJeuJfuFJjaq6D1NCRci6w&s";
        const sql: QueryConfig = {
            text: `
            INSERT INTO products (title, description, price, image_src)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            values: [title, description, price, imageSrc],
        };
        logger.debug("running sql: ", sql);
        const {
            rows: [pgProduct],
        } = await db.query(sql);
        logger.debug("result", pgProduct);
    }
}
