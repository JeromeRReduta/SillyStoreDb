import express, { NextFunction, Request, Response } from "express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import ViteExpress from "vite-express";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import morgan from "morgan";
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

const orderProductDao: IOrderProductDao = new PgOrderProductDao({
    db,
    orderMapper: pgDataMappers.orderMapper,
    orderProductMapper: pgDataMappers.orderProductMapper,
    productMapper: pgDataMappers.productMapper,
});

app.route("/products/:id/orders").get(async (req, res, next) => {
    try {
        const orders: IOrderResponse[] =
            await orderProductDao.getOrdersIncludingProductAsync({
                productId: parseInt(req.params.id),
                userId: 1,
            });
        res.status(HttpStatus.OK).send(orders);
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    // TODO - fix error returning
    logger.error("ERROR IS", err);
    const code: number = typeof err.code === "number" ? err.code : 500;
    res.status(code).send(err);
});
