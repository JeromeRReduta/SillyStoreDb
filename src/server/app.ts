import express from "express";
import userRouter from "../presentation/routes/users.ts";
import productRouter from "../presentation/routes/products.ts";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import psqlErrorHandler from "../application/middleware/PsqlErrorHandler.ts";
import finalErrorHandler from "../application/middleware/FinalErrorHandler.ts";
import orderRouter from "../presentation/routes/orders.ts";
import cors from "cors";

// TODO: change logger to mask pw_hash fields
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
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
/** Just gonna add these 2 error handlers from assignments */
app.use(psqlErrorHandler, finalErrorHandler);

export default app;
