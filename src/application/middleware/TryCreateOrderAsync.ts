import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/ICreateOrderRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";

export default async function tryCreateOrderAsync(
    req: Request<object, IOrderResponse, { dateStr: string }>,
    res: Response<IOrderResponse>,
    next: NextFunction,
): Promise<void> {
    try {
        const { clientOrderService } = apiConfigs.services;
        const dto: ICreateOrderRequest = {
            dateStr: req.body.dateStr,
            userId: req.userId!,
        };
        const created: IOrderResponse =
            await clientOrderService.createAsync(dto);
        res.status(HttpStatus.CREATED).send(created);
    } catch (e) {
        next(e);
    }
}
