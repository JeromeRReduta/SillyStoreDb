import { ILogObj, Logger } from "tslog";

const minLevel: number = process.env.LOG_LEVEL
    ? Number.parseInt(process.env.LOG_LEVEL)
    : 0;
const logger: Logger<ILogObj> = new Logger({ minLevel });

export default logger;
