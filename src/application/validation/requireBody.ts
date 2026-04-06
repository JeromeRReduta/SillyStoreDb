import { NextFunction, Request, Response } from "express";
import HttpStatus from "../StatusCodes.ts";
import { ApiError } from "../ApiError.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default function requireBody(fields: string[]) {
    return <
        TRequestParams extends object,
        TRequestBody extends object,
        TResponseBody,
    >(
        req: Request<TRequestParams, TResponseBody, TRequestBody>,
        _res: Response<TResponseBody>,
        next: NextFunction,
    ): void => {
        logger.error("A", req.body);
        if (!req.body) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                "Request body is required",
            );
        }
        const missing = fields.filter((field) => !(field in req.body));
        if (missing.length > 0) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                `Missing fields: ${missing.join(", ")}`,
            );
        }
        next();
    };
}
