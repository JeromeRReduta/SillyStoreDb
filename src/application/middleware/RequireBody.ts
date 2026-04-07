import { Request, Response, NextFunction } from "express";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import HttpError from "../http/HttpError.ts";
import HttpStatus from "../http/HttpStatus.ts";

export default function requireBody(fields: string[]) {
    return <
        TRequestParams extends object,
        TRequestBody extends object,
        TResponseBody,
    >(
        req: Request<TRequestParams, TResponseBody, TRequestBody>,
        _res: Response<TResponseBody>,
        next: NextFunction,
    ) => {
        logger.debug("checking req for fields:", fields);
        if (!req.body) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Request body is required",
            );
        }
        const missing: string[] = fields.filter(
            (field) => !(field in req.body),
        );
        if (missing.length > 0) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                `Need fields: ${missing.join(", ")}`,
            );
        }
        next();
    };
}
