import express from "express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import userRouter from "../presentation/routes/users.ts";
import HttpError from "../errors/HttpError.ts";
import productRouter from "../presentation/routes/products.ts";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import psqlErrorHandler from "../application/middleware/PsqlErrorHandler.ts";
import finalErrorHandler from "../application/middleware/FinalErrorHandler.ts";

// TODO: change logger to mask pw_hash fields
const app = express();
app.use(morgan("dev"), express.json(), cookieParser());
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

/** Just gonna add these 2 error handlers from assignments */
app.use(psqlErrorHandler, finalErrorHandler);

export default app;
