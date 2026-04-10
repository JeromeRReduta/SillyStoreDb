import express, { NextFunction, Request, Response } from "express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import ViteExpress from "vite-express";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import morgan, { token } from "morgan";
import services, { db } from "../configs/BackendConfigs.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import { IProductRepository } from "../domain/repos/IProductRepository.ts";
import ProductRepository from "../domain/repos/ProductRepository.ts";
import { IGetProductRequest } from "../application/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../application/dtos/responses/IProductResponse.ts";
import { HttpStatus } from "../application/http/HttpStatus.ts";
import { IOrderProductDao } from "../infrastructure/data_access/IOrderProductDao.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgOrderProductDao.ts";
import { IOrderResponse } from "../application/dtos/responses/IOrderResponse.ts";
import { IProductDao } from "../infrastructure/data_access/IProductDao.ts";
import userRouter from "../presentation/routes/users.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import { TokenResponse } from "../application/dtos/responses/TokenResponse.ts";
import tokenOps from "../application/jwt/TokenOperations.ts";
import requireSignedIn from "../application/middleware/RequireSignedIn.ts";
import psqlErrorHandler from "../application/middleware/PsqlErrorHandler.ts";
import finalErrorHandler from "../application/middleware/FinalErrorHandler.ts";
import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import { IGetAllOrdersRequest } from "../application/dtos/requests/IGetAllOrdersRequest.ts";
import HttpError from "../errors/HttpError.ts";
import { ICreateOrderRequest } from "../application/dtos/requests/ICreateOrderRequest.ts";

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
const pgOrderDao: IOrderDao = new PgOrderDao(db, pgDataMappers.orderMapper);

// app.route("/orders").get(async (req, res, next) => {
//     const dto: IGetAllOrdersRequest = {
//         userId: 1,
//     };
//     logger.debug("running w/ service");
//     const orders = await services.clientOrderService.getAllOwnedAsync(dto);
//     res.status(HttpStatus.OK).send(orders);
// });

// app.route("/admin/orders").get(async (req, res, next) => {
//     const dto: IGetAllOrdersRequest = {
//         userId: null,
//     };
//     logger.debug("running w/ service");
//     const orders = await services.clientOrderService.getAllOwnedAsync(dto);
//     res.status(HttpStatus.OK).send(orders);
// });

app.route("/orders/:id").get(async (req, res, next) => {
    const userId: number = (
        tokenOps.verify(req.cookies.token) as { id: number }
    ).id;
    const orderId: number = parseInt(req.params.id);
    const order: IOrderResponse | null =
        await services.clientOrderService.getAsync({
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

app.route("/orders").post(async (req, res, next) => {
    const dto: ICreateOrderRequest = {
        userId: (tokenOps.verify(req.cookies.token) as { id: number }).id,
        dateStr: "2000-06-09",
    };
    const created: IOrderResponse = await pgOrderDao.createAsync(dto);
    res.status(HttpStatus.CREATED).send(created);
});

app.use(psqlErrorHandler, finalErrorHandler);

ViteExpress.listen(app, 3000, async () => {
    await db.connect();
    logger.info("Server is listening on port 3000...");
});

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
