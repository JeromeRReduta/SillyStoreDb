import { Client, QueryConfig } from "pg";
import { Quantities } from "./seed.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default async function seedOrdersProducts(
    db: Client,
    { users, ordersPerUser, productsPerOrder }: Quantities,
) {
    for (let userI = 0; userI < users; userI++) {
        for (let offset = 1; offset < ordersPerUser + 1; offset++) {
            const orderId: number = userI * ordersPerUser + offset;
            for (
                let productId = 1;
                productId < productsPerOrder + 1;
                productId++
            ) {
                // remember psql ids start @ 1
                const quantity: number = 5;
                const sql: QueryConfig = {
                    text: `
                    INSERT INTO orders_products (order_id, product_id, quantity)
                    VALUES ($1, $2, $3)
                    RETURNING *
                    `,
                    values: [orderId, productId, quantity],
                };
                logger.debug("running sql: ", sql);
                const {
                    rows: [pgOrderProduct],
                } = await db.query(sql);
                logger.debug("result: ", pgOrderProduct);
            }
        }
    }
}
