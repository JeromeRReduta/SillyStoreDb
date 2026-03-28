import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import pg, { type Client } from "pg";

const numUsers: number = 5;
const numProducts: number = 10;
const numOrdersPerUser: number = 2;
const numSaltRounds: number = 10;

// TODO: figure out how to make this run - also fix .env.development conn string

async function seedUsers(num: number): Promise<void> {}
async function seedProducts(num: number): Promise<void> {}
async function seedOrders(numPerUser: number): Promise<void> {}
async function seedOrdersProducts({
    numUsers,
    numProducts,
    numOrdersPerUser,
}: {
    numUsers: number;
    numProducts: number;
    numOrdersPerUser: number;
}): Promise<void> {}

async function main(): Promise<void> {
    const db: Client = new pg.Client(configs.db.connectionString);
    logger.debug("Connecting to db...");
    await db.connect();
    logger.debug("Begin seeding...");
    await seedUsers(numUsers);
    await seedProducts(numProducts);
    await seedOrders(numOrdersPerUser);
    await seedOrdersProducts({ numUsers, numProducts, numOrdersPerUser });
    logger.debug("Closing db connection...");
    await db.end();
    logger.debug("seed complete! Ending process.");
}

main();
