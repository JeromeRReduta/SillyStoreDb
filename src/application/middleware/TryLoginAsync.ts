import { NextFunction, Request, Response } from "express";
import { saveToken } from "./SaveToken.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IGetUserByCredentialsRequest } from "../../../SillyStoreCommon/dtos/requests/IGetUserByCredentialsRequest.ts";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/responses/TokenResponse.ts";

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
        const { clientUserService } = apiConfigs.services;
        const token: TokenResponse = await clientUserService.loginAsync(
            req.body,
        );
        saveToken(token, res);
        res.status(200).send({ token });
    } catch (e) {
        next(e);
    }
}
