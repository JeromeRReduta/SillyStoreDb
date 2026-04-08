import express, { NextFunction, Request, Response } from "express";
import PG, { Client } from "pg";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import ViteExpress from "vite-express";
import { ICreateUserRequest } from "../application/dtos/requests/ICreateUserRequest.ts";
import { IUserDao } from "../infrastructure/psql/data_access/IUserDao.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import { IUserResponse } from "../application/dtos/responses/IUserResponse.ts";
// import logger from "../../SillyStoreCommon/logging/Logger.ts";
// import { UserDao } from "../infrastructure/data_access/UserDao.ts";
// import { PgUser } from "../infrastructure/psql/entities/IPgUser.ts";
// import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
// import { Client } from "pg";
// import configs from "../../SillyStoreCommon/configs/Configs.ts";
// import PgMapper from "../infrastructure/psql/data_mapping/PgMapper.ts";
// import { UserResponse } from "../application/dtos/responses/UserResponse.ts";
// import { UserRepository } from "../domain/repos/UserRepository.ts";
// import PgUserRepository from "../infrastructure/psql/repositories/PgUserRepository.ts";
// import requireBody from "../application/middleware/RequireBody.ts";
// import HttpStatus from "../application/http/HttpStatus.ts";
// import { CreateUserRequest } from "../application/dtos/requests/CreateUserRequest.ts";
// import tokenOps from "../application/jwt/TokenOperations.ts";
// import HttpError from "../application/http/HttpError.ts";
// import userRouter from "../presentation/routes/users.ts";
// import { db } from "../configs/BackendConfigs.ts";
import morgan from "morgan";
import { IUserRepository } from "../domain/repos/IUserRepository.ts";
import UserRepository from "../domain/repos/UserRepository.ts";
import { TokenResponse } from "../application/dtos/responses/TokenResponse.ts";
import { IClientUserService } from "../application/services/client-user-service/IClientUserService.ts";
import ClientUserService from "../application/services/client-user-service/ClientUserService.ts";
import userRouter from "../presentation/routes/users.ts";
import { db } from "../configs/BackendConfigs.ts";
import { IGetUserByCredentialsRequest } from "../application/dtos/requests/IGetUserByCredentialsRequest.ts";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, 3000, async () => {
    await db.connect();
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
// )

app.use("/users", userRouter);

app.route("/users/login").post(async (req, res, next) => {
    const getUserByCredentialsRequest: IGetUserByCredentialsRequest = {
        username: "user 1",
        pw: "password 1",
        email: "email1@email.com",
    };
    const pgUserDao: IUserDao = new PgUserDao({
        db,
        dataMapper: pgDataMappers.userMapper,
    });
    const userResponse: IUserResponse | null =
        await pgUserDao.getByCredentialsAsync(getUserByCredentialsRequest);
    return res.status(200).send(userResponse);
});

app.use((err, req, res, next) => {
    logger.error("ERROR IS", err);
    const code: number = typeof err.code === "number" ? err.code : 500;
    res.status(code).send(err);
});
