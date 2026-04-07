import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import pg, { type Client } from "pg";
import seedUsers from "./seedUsers.ts";
import seedProducts from "./seedProducts.ts";
import seedOrders from "./seedOrders.ts";
import seedOrdersProducts from "./seedOrdersProducts.ts";
export interface Quantities {
    readonly users: number;
    readonly products: number;
    readonly ordersPerUser: number;
    readonly saltRounds: number;
    readonly productsPerOrder: number;
}

const quantities: Quantities = {
    users: 5,
    products: 10,
    ordersPerUser: 2,
    saltRounds: 10,
    productsPerOrder: 2,
};

async function main(): Promise<void> {
    const db: Client = new pg.Client(configs.db.connectionString);
    logger.info("Connecting to db...");
    await db.connect();
    logger.info("Begin seeding...");
    logger.info("Seeding users...");
    await seedUsers(db, quantities);
    logger.info("Seeding products...");
    await seedProducts(db, quantities);
    logger.info("Seeding orders...");
    await seedOrders(db, quantities);
    logger.info("Adding orders to products...");
    await seedOrdersProducts(db, quantities);
    logger.info("Closing db connection...");
    await db.end();
    logger.info("Seeding complete! Ending process.");
}

main();
