import express from "express";
import ViteExpress from "vite-express";
import logger from "../../logging/Logger";
import dotenv from "dotenv";

const app = express();
dotenv.config({
    debug: true,
    path: __dirname + "/../../.env." + process.env.NODE_ENV,
});

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, 3000, () => {
    logger.info("Server is listening on port 3000...");
    logger.debug("node_env is:", process.env.NODE_ENV);
    logger.debug(process.env.LOG_LEVEL);
    logger.debug(process.env.thingy_thingy);
});
