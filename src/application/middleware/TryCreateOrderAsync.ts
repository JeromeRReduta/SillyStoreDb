import { NextFunction, Request, Response } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import services from "../../configs/BackendConfigs.ts";
import { ICreateOrderRequest } from "../dtos/requests/ICreateOrderRequest.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryCreateOrderAsync(
    req: Request<object, IOrderResponse, { dateStr: string }>,
    res: Response<IOrderResponse>,
    next: NextFunction,
): Promise<void> {
    try {
        const dto: ICreateOrderRequest = {
            dateStr: req.body.dateStr,
            userId: req.userId!,
        };
        const created: IOrderResponse =
            await services.clientOrderService.createAsync(dto);
        res.status(HttpStatus.CREATED).send(created);
    } catch (e) {
        next(e);
    }
}

// req: Request<
//     object,
//     { token: TokenResponse },
//     IGetUserByCredentialsRequest
// >,
// res: Response<{ token: TokenResponse }>,
// next: NextFunction,
