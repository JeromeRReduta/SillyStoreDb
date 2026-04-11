import logger from "../../SillyStoreCommon/logging/Logger.ts";
import { db } from "../configs/BackendConfigs.ts";
import app from "./app.ts";
import configs from "../../SillyStoreCommon/configs/Configs.ts";

app.listen(configs.port, async () => {
    logger.info("Connecting to db...");
    await db.connect();
    logger.info("Server is listening on port 3000...");
});
