import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import pg, { QueryConfig, type Client } from "pg";
import bcrypt from "bcrypt";
import PG from "pg";

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

async function seedUsers(
    db: Client,
    { users, saltRounds }: Quantities,
): Promise<void> {
    for (let i = 0; i < users; i++) {
        const user: PgUser = await addUser(i, db, saltRounds);
        logger.debug("result", user);
    }
}

interface PgUser {
    readonly id: number;
    readonly username: number;
    readonly pw_hash: number;
    readonly email: number;
}

async function addUser(
    i: number,
    db: Client,
    saltRounds: number,
): Promise<PgUser> {
    const username: string = `user ${i}`;
    const pwHash: string = await bcrypt.hash(`password ${i}`, saltRounds);
    const email: string = `email${i}@email.com`;
    const sql: QueryConfig = {
        text: `
            INSERT INTO users (username, pw_hash, email)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
        values: [username, pwHash, email],
    };
    logger.debug("running sql: ", sql);
    const {
        rows: [pgUser],
    } = await db.query(sql);
    return pgUser;
}

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
