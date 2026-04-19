/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import { IAddProductToOrderRequest } from "../application/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../application/dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IOrderProductResponse } from "../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../application/dtos/responses/IOrderResponse.ts";
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
// res.status(HttpStatus.OK).send(orders);
// });

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

app.route("/orders").post(async (req, res, next) => {
    const dto: ICreateOrderRequest = {
        userId: (tokenOps.verify(req.cookies.token) as { id: number }).id,
        dateStr: "2000-06-09",
    };
    const created: IOrderResponse = await pgOrderDao.createAsync(dto);
    res.status(HttpStatus.CREATED).send(created);
});

app.route("/orders/:id/products").post(
    requireSignedIn("CLIENT"),
    async (req, res, next) => {
        try {
            const dto: IAddProductToOrderRequest = {
                orderId: parseInt(req.params.id),
                productId: req.body.productId,
                quantity: req.body.quantity,
                userId: req.userId!,
            };
            const created: IOrderProductResponse =
                await clientOrderService.addProductToOrderAsync(dto);
            res.status(HttpStatus.CREATED).send(created); // TODO - test
            // const created: I
        } catch (e) {
            next(e);
        }
    },
);

app.use(psqlErrorHandler, finalErrorHandler);

app.listen(3000, async () => {
    await db.connect();
    backendLogger.info("Server is listening on port 3000...");
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
