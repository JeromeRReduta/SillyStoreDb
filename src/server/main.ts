import express from "express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import userRouter from "../presentation/routes/users.ts";
import ViteExpress from "vite-express";
import HttpError from "../errors/HttpError.ts";
import { db } from "../configs/BackendConfigs.ts";
import productRouter from "../presentation/routes/products.ts";

// TODO: change logger to mask pw_hash fields
const app = express();
logger.info("Connecting to db...");
await db.connect();

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

app.use(express.json());

ViteExpress.listen(app, 3000, () => {
    logger.info("Server is listening on port 3000...");
});

app.use("/products", productRouter);
app.use("/users", userRouter);

/** Just gonna add these 2 error handlers from assignments */
app.use((err, req, res, next) => {
    logger.error("error here:", err);
    switch (err.code) {
        // Invalid type
        case "22P02":
            return res.status(400).send(err.message);
        // Unique constraint violation
        case "23505":
        // Foreign key violation
        // eslint-disable-next-line no-fallthrough
        case "23503":
            return res.status(400).send(err.detail);
        default:
            next(err);
    }
});

app.use((err: HttpError, req, res, next) => {
    logger.error(err);
    let code: number;
    if (typeof err.code === "string") {
        const parsed: number = Number.parseInt(err.code);
        code = isNaN(parsed) ? 500 : parsed;
    } else {
        code = err.code;
    }
    res.status(code).send(err.message ?? "Sorry! Something went wrong.");
});
