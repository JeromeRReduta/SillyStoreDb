import express from "express";
import ViteExpress from "vite-express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import { UserDao } from "../infrastructure/data_access/UserDao.ts";
import { PgUser } from "../infrastructure/psql/entities/PgUser.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import { Client } from "pg";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import PgMapper from "../infrastructure/psql/data_mapping/PgMapper.ts";
import { UserResponse } from "../application/dtos/responses/UserResponse.ts";

const app = express();
app.use(express.json());
const db: Client = new Client(configs.db.connectionString);
await db.connect();

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, 3000, async () => {
    logger.info("Server is listening on port 3000...");

    logger.debug("done!");
});

app.route("/").get(async (req, res, next) => {
    const userDao: UserDao<PgUser> = new PgUserDao(db, PgMapper.toUser);
    logger.debug("working");
    const response: UserResponse = await userDao.createAsync({
        username: "a",
        pw: "b",
        email: "abbabbabb",
    });
    res.status(200).send(response);
});
