import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import HttpError from "../../errors/HttpError.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default function requireSignedIn(
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction,
) {
    if (!req.userInfo) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "You must be signed in!");
    }
    next();
}
