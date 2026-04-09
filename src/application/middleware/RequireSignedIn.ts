import { NextFunction, Request, Response } from "express";
import HttpError from "../../errors/HttpError.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import tokenOps from "../jwt/TokenOperations.ts";

export default function requireSignedIn(
    req: Request<object, object, object>,
    _res: Response<object>,
    next: NextFunction,
) {
    if (!req.cookies?.token) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "You must be signed in!");
    }
    const { id: userId } = tokenOps.verify(req.cookies.token) as { id: number };
    if (userId === undefined || userId === null) {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            "Your token's weird; get a new one",
        );
    }
    req.userId = userId;
    next();
}
