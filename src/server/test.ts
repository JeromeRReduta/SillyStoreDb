/* eslint-disable @typescript-eslint/no-unused-vars */
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import {
    IUserResponse,
    TokenResponse,
    IGetUserByCredentialsRequest,
    ICreateUserRequest,
} from "../../SillyStoreCommon/dtos/userDtos.ts";
import { HttpStatus } from "../application/http/HttpStatus.ts";
import tokenOps from "../application/jwt/TokenOperations.ts";
import requireBody from "../application/middleware/RequireBody.ts";
import apiConfigs from "../configs/ApiConfigs.ts";
import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import { IProductDao } from "../infrastructure/data_access/IProductDao.ts";
import { IUserDao } from "../infrastructure/data_access/IUserDao.ts";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import backendConfigs from "../configs/BackendConfigs.ts";
import backendLogger from "../configs/BackendLogger.ts";
import UserClientService from "../application/services/UserClientService.ts";
import {
    IGetAllProductsRequest,
    IGetProductRequest,
    IProductResponse,
} from "../../SillyStoreCommon/dtos/productDtos.ts";

const app = express();
app.use(
    express.json(),
    morgan("dev"),
    cookieParser(),
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }),
);
const { db } = apiConfigs;

interface ITestDaos {
    readonly orders?: IOrderDao;
    readonly products?: IProductDao;
    readonly users?: IUserDao;
}

const testDaos: ITestDaos = {
    products: new PgProductDao(db),
    users: new PgUserDao(db),
    orders: new PgOrderDao(db),
};

const testServices = {
    users: new UserClientService(testDaos.users!),
};

setupUserRoutes(app);
setupProductRoutes(app);
initApp(app);

function setupUserRoutes(app: Express): void {
    app.route("/users/register").post(
        requireBody(["username", "email", "pw"]),
        async (req, res, next) => {
            const dto: ICreateUserRequest = req.body;
            // const user: IUserResponse = await testDaos.users!.createAsync(req.body);
            // const token: TokenResponse = tokenOps.create({ id: user.id });
            const token: TokenResponse =
                await testServices.users.registerAsync(dto);
            res.status(HttpStatus.CREATED).send(token);
        },
    );

    app.route("/users/login").post(
        requireBody(["email", "pw"]),
        async (req, res, next) => {
            const dto: IGetUserByCredentialsRequest = req.body;
            // const user: IUserResponse | null =
            //     await testDaos.users!.getByCredentialsAsync(dto);
            // const token: TokenResponse | null = user
            //     ? tokenOps.create({ id: user.id, role: user.role })
            //     : null;
            const token: TokenResponse =
                await testServices.users.loginAsync(dto);
            res.status(token ? HttpStatus.CREATED : HttpStatus.NOT_FOUND).send(
                token,
            );
        },
    );
}

function setupProductRoutes(app: Express): void {
    app.route("/products").get(async (req, res, next) => {
        const dto: IGetAllProductsRequest = {};
        const products: IProductResponse[] =
            await testDaos.products!.getAllAsync(dto);
        res.status(HttpStatus.OK).send(products);
    });

    app.route("/products/:id").get(async (req, res, next) => {
        const dto: IGetProductRequest = { id: parseInt(req.params.id) };
        const product: IProductResponse | null =
            await testDaos.products!.getAsync(dto);
        res.status(product ? HttpStatus.OK : HttpStatus.NOT_FOUND).send(
            product,
        );
    });
}

function initApp(app: Express): void {
    app.listen(backendConfigs.db.port, async () => {
        const { db } = apiConfigs;
        backendLogger.info("Connecting to db...");
        await db.connect();
        backendLogger.info("Server is listening on port 3000...");
    });
}
