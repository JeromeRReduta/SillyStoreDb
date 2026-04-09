import { NextFunction, Request, Response } from "express";
import tokenOps from "../jwt/TokenOperations.ts";

export function getIdFromUserToken(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    req.userId = req.session?.token
        ? (tokenOps.verify(req.session.token) as { id: number }).id
        : null;
    next();
}

// return <
//         TRequestParams extends object,
//         TRequestBody extends object,
//         TResponseBody,
//     >(
//         req: Request<TRequestParams, TResponseBody, TRequestBody>,
//         _res: Response<TResponseBody>,
//         next: NextFunction,
