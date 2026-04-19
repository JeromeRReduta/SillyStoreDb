import { NextFunction, Request, Response } from "express";
import { TokenResponse } from "../dtos/responses/TokenResponse.ts";
import { ICreateUserRequest } from "../dtos/requests/ICreateUserRequest.ts";
import { saveToken } from "./SaveToken.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

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
