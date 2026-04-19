import { NextFunction, Request, Response } from "express";
import { saveToken } from "./SaveToken.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { ICreateUserRequest } from "../../../SillyStoreCommon/dtos/requests/ICreateUserRequest.ts";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/responses/TokenResponse.ts";

export default async function tryRegisterAsync(
    req: Request<object, { token: TokenResponse }, ICreateUserRequest>,
    res: Response<{ token: TokenResponse }>,
    next: NextFunction,
) {
    try {
        const { clientUserService } = apiConfigs.services;
        const token: TokenResponse = await clientUserService.registerAsync(
            req.body,
        );
        saveToken(token, res);
        res.status(201).send({ token });
    } catch (e) {
        next(e);
    }
}
