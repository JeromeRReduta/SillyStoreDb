import { NextFunction, Request, Response } from "express";
import HttpError from "../../errors/HttpError.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import tokenOps from "../jwt/TokenOperations.ts";

export default function requireSignedIn(
    role: "ADMIN" | "CLIENT" | "ANY" = "CLIENT",
) {
    return function (
        req: Request<object, object, object>,
        _res: Response<object>,
        next: NextFunction,
    ) {
        if (!req.cookies?.token) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "You must be signed in!",
            );
        }
        const { id: userId } = tokenOps.verify(req.cookies.token) as {
            id: number;
        };
        const isTokenInvalid: boolean = userId === undefined;
        const isUnderPrivileged: boolean = role === "ADMIN" && userId !== null;
        const isOverPrivileged: boolean = role === "CLIENT" && userId === null;

        if (isTokenInvalid) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Your token's weird; get a new one",
            );
        }
        if (isUnderPrivileged) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Admin privileges required!",
            );
        }
        if (isOverPrivileged) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You're supposed to be on an admin service (PENDING). How'd you get here?",
            );
        }
        req.userId = userId;
        next();
    };
}
