import { NextFunction, Request, Response } from "express";
import HttpError from "../../errors/HttpError.ts";
import HttpStatus from "../http/HttpStatus.ts";
import backendLogger from "../../configs/BackendLogger.ts";
const psqlInvalidType: string = "22P02";
const psqlFKeyViolation: string = "23503";
const psqlUniqueViolation: string = "23505";

export default function psqlErrorHandler(
    err: { code?: string; message?: string; detail?: string } & HttpError,
    _req: Request<object, string, object>,
    res: Response<string>,
    next: NextFunction,
): void {
    let psqlErr: HttpError | null;
    switch (err.code) {
        case psqlInvalidType:
            psqlErr = new HttpError(HttpStatus.BAD_REQUEST, err.message!);
            break;
        case psqlUniqueViolation:
        case psqlFKeyViolation:
            psqlErr = new HttpError(HttpStatus.BAD_REQUEST, err.detail!);
            break;
        default:
            psqlErr = null;
    }
    if (psqlErr) {
        backendLogger.error("psql error: ", psqlErr);
        res.status(psqlErr.code).send(psqlErr.message!);
        return;
    }
    next(err);
}
