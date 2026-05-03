import { NextFunction, Request, Response } from "express";
import saveToken from "./SaveToken.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import {
    TokenResponse,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";

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
        const { userClientService: service } = apiConfigs.services;
        const dto: IGetUserByCredentialsRequest = req.body;
        const token: TokenResponse = await service.loginAsync(dto);
        saveToken(token, res);
        res.status(200).send({ token });
    } catch (e) {
        next(e);
    }
}
