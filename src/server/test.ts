import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import { ICreateOrderRequest } from "../application/dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetProductsInOrderRequest } from "../application/dtos/requests/IGetProductsInOrder.ts";
import { IOrderResponse } from "../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../application/dtos/responses/IProductResponse.ts";
import { HttpStatus } from "../application/http/HttpStatus.ts";
import tokenOps from "../application/jwt/TokenOperations.ts";
import finalErrorHandler from "../application/middleware/FinalErrorHandler.ts";
import psqlErrorHandler from "../application/middleware/PsqlErrorHandler.ts";
import services, { db } from "../configs/BackendConfigs.ts";
import HttpError from "../errors/HttpError.ts";
import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import { IOrderProductDao } from "../infrastructure/data_access/IOrderProductDao.ts";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgOrderProductDao.ts";
import ViteExpress from "vite-express";
import cors from "cors";
import requireSignedIn from "../application/middleware/RequireSignedIn.ts";

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

const { orderMapper, productMapper, orderProductMapper } = pgDataMappers;
const pgOrderDao: IOrderDao = new PgOrderDao(db, orderMapper);
const pgOrderProductDao: IOrderProductDao = new PgOrderProductDao({
    db,
    orderMapper,
    productMapper,
    orderProductMapper,
});

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

app.route("/orders/:id/products").get(
    requireSignedIn("CLIENT"),
    async (req, res, next) => {
        try {
            const dto: IGetProductsInOrderRequest = {
                orderId: parseInt(req.params.id),
                userId: req.userId!,
            };
            const products: IProductResponse[] =
                await services.clientOrderService.getProductsInOrderAsync(dto);
            res.status(HttpStatus.OK).send(products);
        } catch (e) {
            next(e);
        }
    },
);

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
