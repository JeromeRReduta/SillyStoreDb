import { NextFunction, Request, Response } from "express";
import { TokenResponse } from "../dtos/responses/TokenResponse.ts";
import { IGetUserByCredentialsRequest } from "../dtos/requests/IGetUserByCredentialsRequest.ts";
import services from "../../configs/BackendConfigs.ts";
import { saveToken } from "./SaveToken.ts";

export default async function tryLoginAsync(
    req: Request<
        object,
        { token: TokenResponse },
        IGetUserByCredentialsRequest
    >,
    res: Response<{ token: TokenResponse }>,
    next: NextFunction,
) {
    try {
        const token: TokenResponse =
            await services.clientUserService.loginAsync(req.body);
        saveToken(token, res);
        res.status(200).send({ token });
    } catch (e) {
        next(e);
    }
}
