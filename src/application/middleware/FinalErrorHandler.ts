import { NextFunction, Request, Response } from "express";
import HttpError from "../../errors/HttpError.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default function finalErrorHandler(
    err: HttpError,
    _req: Request<object, string, object>,
    res: Response<string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void {
    logger.error(err);
    res.status(err.code).send(err.message ?? "Sorry! something went wrong!");
}
