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

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }),
);

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
const productDao: IProductDao = new PgProductDao(
    db,
    pgDataMappers.productMapper,
);
const productRepo: IProductRepository = new ProductRepository({
    orderProductDao,
    productDao,
});

app.route("/products/:id/orders").get(
    requireSignedIn,
    async (req: Request<{ id: string }, object, object>, res, next) => {
        try {
            const orders: IOrderResponse[] =
                await services.clientProductService.getOrdersIncludingProduct({
                    // todo: make actual route in products - validate w/ requireSignedIn, but DON'T have to validate req.params.id since it's literally guaranteed by express
                    productId: parseInt(req.params.id),
                    userId: req.userId!,
                });
            res.status(HttpStatus.OK).send(orders);
        } catch (e) {
            next(e);
        }
    },
);

app.use("/users", userRouter);

app.route("/users").get((req, res, next) => {
    logger.debug("cookies", req.cookies);
    res.status(200).send("a");
});

app.use((err, req, res, next) => {
    // TODO - fix error returning
    logger.error("ERROR IS", err);
    const code: number = typeof err.code === "number" ? err.code : 500;
    res.status(code).send(err);
});
