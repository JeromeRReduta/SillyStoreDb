import { NextFunction, Request, Response } from "express";
import { TokenResponse } from "../dtos/responses/TokenResponse.ts";
import { ICreateUserRequest } from "../dtos/requests/ICreateUserRequest.ts";
import services from "../../configs/BackendConfigs.ts";
import { saveToken } from "./SaveToken.ts";

export default async function tryRegisterAsync(
    req: Request<object, { token: TokenResponse }, ICreateUserRequest>,
    res: Response<{ token: TokenResponse }>,
    next: NextFunction,
) {
    try {
        const token: TokenResponse =
            await services.clientUserService.registerAsync(req.body);
        saveToken(token, res);
        res.status(201).send({ token });
    } catch (e) {
        next(e);
    }
}
