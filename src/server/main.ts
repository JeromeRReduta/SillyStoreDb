import logger from "../../SillyStoreCommon/logging/Logger.ts";
import app from "./app.ts";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import apiConfigs from "../configs/ApiConfigs.ts";

app.listen(configs.port, async () => {
    const { db } = apiConfigs;
    logger.info("Connecting to db...");
    await db.connect();
    logger.info("Server is listening on port 3000...");
});
