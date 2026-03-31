import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import pg, { type Client } from "pg";
import seedUsers from "./seedUsers.ts";

export interface Quantities {
    readonly users: number;
    readonly products: number;
    readonly ordersPerUser: number;
    readonly saltRounds: number;
}

const quantities: Quantities = {
    users: 5,
    products: 10,
    ordersPerUser: 2,
    saltRounds: 10,
};

async function seedProducts(
    db: Client,
    { products }: Quantities,
): Promise<void> {}
async function seedOrders(
    db: Client,
    { ordersPerUser }: Quantities,
): Promise<void> {}
async function seedOrdersProducts(
    db: Client,
    { users, products, ordersPerUser }: Quantities,
): Promise<void> {}

async function main(): Promise<void> {
    const db: Client = new pg.Client(configs.db.connectionString);
    logger.info("Connecting to db...");
    await db.connect();
    logger.info("Begin seeding...");
    await seedUsers(db, quantities);
    await seedProducts(db, quantities);
    await seedOrders(db, quantities);
    await seedOrdersProducts(db, quantities);
    logger.info("Closing db connection...");
    await db.end();
    logger.info("seed complete! Ending process.");
}

main();
