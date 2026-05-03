import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import tokenOps from "../jwt/TokenOperations.ts";

export default function processToken(
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction,
) {
    if (req.cookies?.token) {
        req.userInfo = tokenOps.extractUserInfo(req.cookies.token);
    }
    next();
}
