/**
 *
 * TODO:
 * 1. migrate Logger to SillyStoreDTOs
 * 2. Change SillyStoreDTOs title to SillyStoreCommon
 *  2.5. Explicitly set NODE_ENV in npm run dev to "development"
 * 3. SillyStoreCommon - make config file that parses process.env
 * 4. SillyStoreCommon - make Logger take level from config, not process.env directly
 *
 */

import { ILogObj, Logger } from "tslog";

const minLevel: number = process.env.LOG_LEVEL
    ? Number.parseInt(process.env.LOG_LEVEL)
    : 0;
const logger: Logger<ILogObj> = new Logger({ minLevel });

export default logger;
