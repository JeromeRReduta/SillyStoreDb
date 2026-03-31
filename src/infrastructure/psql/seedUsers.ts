import { Client, QueryConfig } from "pg";
import { Quantities } from "./seed.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import bcrypt from "bcrypt";

export default async function seedUsers(
    db: Client,
    { users, saltRounds }: Quantities,
): Promise<void> {
    for (let i = 0; i < users; i++) {
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
        logger.debug("result", pgUser);
        return pgUser;
    }
}
