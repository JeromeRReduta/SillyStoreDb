import { Logger, type ILogObj } from "tslog";
import backendConfigs from "./BackendConfigs.ts";

const backendLogger: Logger<ILogObj> = new Logger({
    minLevel: backendConfigs.logging.minLevel,
});

export default backendLogger;
