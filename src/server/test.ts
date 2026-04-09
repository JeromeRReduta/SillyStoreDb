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

const repo: IProductRepository = new ProductRepository({
    orderProductDao: {},
    productDao: new PgProductDao(db, pgDataMappers.productMapper),
});

app.route("/products/:id").get(
    async (
        req: Request<IGetProductRequest, IProductResponse, object>,
        res: Response<IProductResponse>,
        next: NextFunction,
    ) => {
        try {
            const found: IProductResponse =
                await services.clientProductService.getAsync(req.params);
            res.status(HttpStatus.OK).send(found);
        } catch (e) {
            next(e);
        }
    },
);

app.use((err, req, res, next) => {
    // TODO - fix error returning
    logger.error("ERROR IS", err);
    const code: number = typeof err.code === "number" ? err.code : 500;
    res.status(code).send(err);
});
