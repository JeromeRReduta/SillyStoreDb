import express from "express";
import ViteExpress from "vite-express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";

const app = express();

app.get("/hello", (_, res) => {
    res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, 3000, () => {
    logger.info("Server is listening on port 3000...");
});
