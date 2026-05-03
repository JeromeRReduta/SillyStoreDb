import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import saveToken from "./SaveToken.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import {
    TokenResponse,
    ICreateUserRequest,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";

export default async function tryRegisterAsync(
    req: ExpressRequest<object, { token: TokenResponse }, ICreateUserRequest>,
    res: ExpressResponse<{ token: TokenResponse }>,
    next: NextFunction,
) {
    try {
        const { userClientService: service } = apiConfigs.services;
        const dto: ICreateUserRequest = req.body;
        const token: TokenResponse = await service.registerAsync(dto);
        saveToken(token, res);
        res.status(201).send({ token });
    } catch (e) {
        next(e);
    }
}
