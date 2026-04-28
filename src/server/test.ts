/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import { HttpStatus } from "../application/http/HttpStatus.ts";
import tokenOps from "../application/jwt/TokenOperations.ts";
import finalErrorHandler from "../application/middleware/FinalErrorHandler.ts";
import psqlErrorHandler from "../application/middleware/PsqlErrorHandler.ts";
import requireSignedIn from "../application/middleware/RequireSignedIn.ts";
import backendLogger from "../configs/BackendLogger.ts";
import { IOrderRepository } from "../domain/repos/IOrderRepository.ts";
import OrderRepository from "../domain/repos/OrderRepository.ts";
import HttpError from "../errors/HttpError.ts";
import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import { IOrderProductDao } from "../infrastructure/data_access/ICartItemDao.ts";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgOrderProductDao.ts";
import apiConfigs from "../configs/ApiConfigs.ts";
import { IOrderProductResponse } from "../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductRepository } from "../domain/repos/IProductRepository.ts";
import ProductRepository from "../domain/repos/ProductRepository.ts";
import { IProductDao } from "../infrastructure/data_access/IProductDao.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import userRouter from "../presentation/routes/users.ts";
import { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { ICreateOrderRequest } from "../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrdersRequest.ts";
import { IUserDao } from "../infrastructure/data_access/IUserDao.ts";
import { IGetAllProductsRequest } from "../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IUserRepository } from "../domain/repos/IUserRepository.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import requireBody from "../application/middleware/RequireBody.ts";
import { IUserResponse } from "../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { TokenResponse } from "../../SillyStoreCommon/dtos/responses/TokenResponse.ts";
import UserRepository from "../domain/repos/UserRepository.ts";

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
    readonly ordersProducts?: IOrderProductDao;
}

interface ITestRepos {
    readonly orders?: IOrderRepository;
    readonly products?: IProductRepository;
    readonly users?: IUserRepository;
}

const testDaos: ITestDaos = {
    products: new PgProductDao(db),
    ordersProducts: new PgOrderProductDao(db),
    users: new PgUserDao(db),
    orders: new PgOrderDao(db),
};

// TODO: test orderRepo, then services

const testRepos: ITestRepos = {
    products: new ProductRepository({
        orderProductDao: testDaos.ordersProducts!,
        productDao: testDaos.products!,
    }),
    users: new UserRepository(testDaos.users!),
    orders: new OrderRepository(testDaos.orders!, testDaos.ordersProducts!),
};
/** PRODUCTS */
// app.route("/products").get(async (req, res, next) => {
//     const dto: IGetAllProductsRequest = {};
//     const products: IProductResponse[] =
//         await testRepos.products!.getAllAsync(dto);
//     res.status(HttpStatus.OK).send(products);
// });

// app.route("/products/:id").get(async (req, res, next) => {
//     const dto: IGetProductRequest = { id: parseInt(req.params.id) };
//     const product: IProductResponse | null =
//         await testRepos.products!.getAsync(dto);
//     res.status(HttpStatus.OK).send(product);
// });

/** USERS */

app.route("/users/register").post(
    requireBody(["username", "email", "pw"]),
    async (req, res, next) => {
        const user: IUserResponse = await testRepos.users!.createAsync(
            req.body,
        );
        const token: TokenResponse = tokenOps.create({ id: user.id });
        res.status(HttpStatus.CREATED).send(token);
    },
);

app.route("/users/login").post(async (req, res, next) => {
    const user: IUserResponse | null =
        await testRepos.users!.getByCredentialsAsync(req.body);
    const token: TokenResponse | null = user
        ? tokenOps.create({ id: user.id })
        : null;
    res.cookie("token", token);

    res.status(HttpStatus.OK).send(token);
});

/** ORDERS */
const userId: number | null = 10;

app.route("/orders").get(async (req, res, next) => {
    const orders: IOrderResponse[] = await testRepos.orders!.getAllAsync({
        userId,
    });
    res.status(HttpStatus.OK).send(orders);
});

app.route("/orders/pending/orders").get(async (req, res, next) => {
    const pendingOrders: IOrderResponse[] =
        await testRepos.orders!.getAllPendingOrdersAsync({ userId });
    const found: IOrderResponse | null =
        pendingOrders.length > 0 ? pendingOrders[0] : null;
    res.status(HttpStatus.OK).send(found);
});

app.route("/orders/pending/products").get(async (req, res, next) => {
    const products: IProductResponse[] =
        await testRepos.orders!.getProductsWithQuantitiesInPendingOrdersAsync({
            orderId: 0,
            userId,
            includingQuantities: false,
        });
    res.status(HttpStatus.OK).send(products);
});

app.route("/orders/:id").get(async (req, res, next) => {
    const order: IOrderResponse | null = await testRepos.orders!.getAsync({
        orderId: parseInt(req.params.id),
        userId,
    });
    res.status(HttpStatus.OK).send(order);
});
app.listen(3000, async () => {
    await db.connect();
    backendLogger.info("Server is listening on port 3000...");
});
