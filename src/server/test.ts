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
import { IOrderProductDao } from "../infrastructure/data_access/IOrderProductDao.ts";
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
const { orderMapper, productMapper, orderProductMapper } = pgDataMappers;
const pgOrderDao: IOrderDao = new PgOrderDao(db, orderMapper);
const pgOrderProductDao: IOrderProductDao = new PgOrderProductDao({
    db,
    orderMapper,
    productMapper,
    orderProductMapper,
});
const orderRepo: IOrderRepository = new OrderRepository(
    pgOrderDao,
    pgOrderProductDao,
);
const { clientOrderService, clientProductService, clientUserService } =
    apiConfigs.services;

// const orderDao: IOrderDao = new PgOrderDao(backendConfigs.db, pgDataMappers.orderMapper)
// orderRouter.route("/cart")
//     .get(async(req, res, next) => {
//         const db:

//     })

app.route("/orders/cart").get(async (req, res, next) => {
    const orders: IProductResponse[] =
        await orderProductDao.getProductsInCartAsync({
            userId: 1,
        });
    res.status(HttpStatus.OK).send(orders);
});
app.route("/orders/:id").get(async (req, res, next) => {
    const userId: number = (
        tokenOps.verify(req.cookies.token) as { id: number }
    ).id;
    const orderId: number = parseInt(req.params.id);
    const order: IOrderResponse | null = await clientOrderService.getAsync({
        orderId,
        userId,
    });
    if (!order) {
        throw new HttpError(HttpStatus.NOT_FOUND, "NOT FOUND");
    }
    res.status(HttpStatus.OK).send(order);
});

app.route("/orders").get(async (req, res, next) => {
    const dto: IGetAllOrdersRequest = {
        userId: (tokenOps.verify(req.cookies.token) as { id: number }).id,
    };
    const orders: IOrderResponse[] = await pgOrderDao.getAllAsync(dto);
    res.status(HttpStatus.OK).send(orders);
});

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
};

const testRepos: ITestRepos = {
    products: new ProductRepository({
        orderProductDao: testDaos.ordersProducts!,
        productDao: testDaos.products!,
    }),
};

app.route("/products").get(async (req, res, next) => {
    const dto: IGetAllProductsRequest = {};
    const products: IProductResponse[] =
        await testRepos.products!.getAllAsync(dto);
    res.status(HttpStatus.OK).send(products);
});

app.route("/products/:id").get(async (req, res, next) => {
    const dto: IGetProductRequest = { id: parseInt(req.params.id) };
    const product: IProductResponse | null =
        await testRepos.products!.getAsync(dto);
    res.status(HttpStatus.OK).send(product);
});

// app.route("/orders/:id/products").get(async (req, res, next) => {
//     try {
//         const products: IProductResponse[] =
//             await clientOrderService.getProductsInOrderAsync({
//                 orderId: parseInt(req.params.id),
//                 userId: tokenOps.verify(req.cookies.token).id,
//                 includingQuantities: true,
//             });
//         res.status(HttpStatus.OK).send(products);
//     } catch (e) {
//         next(e);
//     }
// });
// app.route("/orders/:id/products").post(
//     requireSignedIn("CLIENT"),
//     async (req, res, next) => {
//         try {
//             const dto: IAddProductToOrderRequest = {
//                 orderId: parseInt(req.params.id),
//                 productId: req.body.productId,
//                 quantity: req.body.quantity,
//                 userId: req.userId!,
//             };
//             const created: IOrderProductResponse =
//                 await clientOrderService.addProductToOrderAsync(dto);
//             res.status(HttpStatus.CREATED).send(created); // TODO - test
//             // const created: I
//         } catch (e) {
//             next(e);
//         }
//     },
// );

// app.use("/users", userRouter);
// app.use(psqlErrorHandler, finalErrorHandler);

// app.listen(3000, async () => {
//     await db.connect();
//     backendLogger.info("Server is listening on port 3000...");
// });
// const orderDao: IOrderDao = new PgOrderDao(db, orderMapper);

// const orderProductDao: IOrderProductDao = new PgOrderProductDao({
//     db,
//     orderMapper: pgDataMappers.orderMapper,
//     orderProductMapper: pgDataMappers.orderProductMapper,
//     productMapper: pgDataMappers.productMapper,
// });
// const productDao: IProductDao = new PgProductDao(
//     db,
//     pgDataMappers.productMapper,
// );
// const productRepo: IProductRepository = new ProductRepository({
//     orderProductDao,
//     productDao,
// });
