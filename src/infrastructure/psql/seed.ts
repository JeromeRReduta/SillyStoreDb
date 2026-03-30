import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import pg, { type Client } from "pg";

interface Quantities {
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

// TODO: figure out how to make this run - also fix .env.development conn string

async function seedUsers({ users, saltRounds }: Quantities): Promise<void> {}
async function seedProducts({ products }: Quantities): Promise<void> {}
async function seedOrders({ ordersPerUser }: Quantities): Promise<void> {}
async function seedOrdersProducts({
    users,
    products,
    ordersPerUser,
}: Quantities): Promise<void> {}

async function main(): Promise<void> {
    const db: Client = new pg.Client(configs.db.connectionString);
    logger.debug("Connecting to db...");
    await db.connect();
    logger.debug("Begin seeding...");
    await seedUsers(quantities);
    await seedProducts(quantities);
    await seedOrders(quantities);
    await seedOrdersProducts(quantities);
    logger.debug("Closing db connection...");
    await db.end();
    logger.debug("seed complete! Ending process.");
}

main();
