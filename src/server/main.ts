import express from "express";
import logger from "../../SillyStoreCommon/logging/Logger.ts";
import ViteExpress from "vite-express";
import { db } from "../configs/BackendConfigs.ts";
import app from "./app.ts";

ViteExpress.listen(app, 3000, async () => {
    logger.info("Connecting to db...");
    await db.connect();
    logger.info("Server is listening on port 3000...");
});
