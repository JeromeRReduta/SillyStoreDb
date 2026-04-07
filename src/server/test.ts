import express, { NextFunction, Request, Response } from "express";
import ViteExpress from "vite-express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import { UserDao } from "../infrastructure/data_access/UserDao.ts";
import { PgUser } from "../infrastructure/psql/entities/PgUser.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import { Client } from "pg";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import PgMapper from "../infrastructure/psql/data_mapping/PgMapper.ts";
import { UserResponse } from "../application/dtos/responses/IUserResponse.ts";
import { UserRepository } from "../domain/repos/UserRepository.ts";
import PgUserRepository from "../infrastructure/psql/repositories/PgUserRepository.ts";
import requireBody from "../application/middleware/RequireBody.ts";
import HttpStatus from "../application/http/HttpStatus.ts";
import { CreateUserRequest } from "../application/dtos/requests/CreateUserRequest.ts";
import tokenOps from "../application/jwt/TokenOperations.ts";
import HttpError from "../application/http/HttpError.ts";
import userRouter from "../presentation/routes/users.ts";
import { db } from "../configs/BackendConfigs.ts";

const app = express();
app.use(express.json());
await db.connect();

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, 3000, async () => {
    logger.info("Server is listening on port 3000...");
});

// app.route("/").post(
//     requireBody(["username", "email", "pw"]),
//     registerUserAndSetTokenAsync,
//     (
//         req: Request<object, UserResponse, CreateUserRequest>,
//         res: Response<string>,
//     ) => {
//         res.status(HttpStatus.CREATED).send(req.session.token);
//     },
// );

app.use("/users", userRouter);

app.use((err: HttpError, req, res, next) => {
    logger.error("ERROR IS", err);
    res.status(err.code || 500).send(err);
});
