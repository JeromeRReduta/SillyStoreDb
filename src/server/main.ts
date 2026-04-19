import app from "./app.ts";
import apiConfigs from "../configs/ApiConfigs.ts";
import backendConfigs from "../configs/BackendConfigs.ts";
import backendLogger from "../configs/BackendLogger.ts";

app.listen(backendConfigs.db.port, async () => {
    const { db } = apiConfigs;
    backendLogger.info("Connecting to db...");
    await db.connect();
    backendLogger.info("Server is listening on port 3000...");
});
