import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import tokenOps from "../jwt/TokenOperations.ts";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos.ts";

export default function processToken(
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction,
) {
    if (req.cookies?.token) {
        req.userInfo = tokenOps.extractUserInfo(req.cookies.token);
    } else if (req.headers.authorization) {
        const token: TokenResponse = req.headers.authorization.split(" ")[1];
        req.userInfo = tokenOps.extractUserInfo(token);
    }
    next();
}
