import express from "express";
import ViteExpress from "vite-express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import userRouter from "../presentation/users.ts";
import RegisterUserCommandHandler from "../application/handlers/userRoute/RegisterUserCommandHandlerBundle.ts";
import PgUserRepository from "../infrastructure/psql/repos/PgUserRepository.ts";
import { Client } from "pg";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import userMapper from "../infrastructure/psql/data_mapping/UserMapper.ts";
import { DataMapper } from "../infrastructure/psql/data_mapping/DataMapper.ts";
import { PgUser } from "../infrastructure/psql/db_entities/PgUser.ts";
import { UserResponse } from "../application/dtos/users/UserResponse.ts";
import userMapper from "../infrastructure/psql/data_mapping/UserMapper.ts";
import { UserRepository } from "../domain/repos/UserRepository.ts";
import { ApiError } from "../application/ApiError.ts";

// TODO: change logger to mask pw_hash fields
const app = express();
const db: Client = new Client(configs.db.connectionString);
logger.info("Connecting to db...");
await db.connect();

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

app.use(express.json());

ViteExpress.listen(app, 3000, () => {
    logger.info("Server is listening on port 3000...");
    logger.debug("node_env is:", process.env.NODE_ENV);
    logger.debug(process.env.LOG_LEVEL);
    logger.debug(process.env.thingy_thingy);
});
// app.use((req, res, next) => {
//     const userRepository: UserRepository = new PgUserRepository(db, userMapper);
//     req.registerUserCommandHandler = new RegisterUserCommandHandler(
//         userRepository,
//     );
//     next();
// });

app.use("/users", userRouter);

/** Just gonna add these 2 error handlers from assignments */
app.use((err, req, res, next) => {
    logger.error("error here:", err);
    switch (err.code) {
        // Invalid type
        case "22P02":
            return res.status(400).send(err.message);
        // Unique constraint violation
        case "23505":
        // Foreign key violation
        // eslint-disable-next-line no-fallthrough
        case "23503":
            return res.status(400).send(err.detail);
        default:
            next(err);
    }
});

app.use((err: ApiError, req, res, next) => {
    logger.error(err);
    let code: number;
    if (typeof err.code === "string") {
        const parsed: number = Number.parseInt(err.code);
        code = isNaN(parsed) ? 500 : parsed;
    } else {
        code = err.code;
    }
    res.status(code).send(err.message ?? "Sorry! Something went wrong.");
});
