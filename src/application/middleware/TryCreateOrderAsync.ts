import { NextFunction, Request, Response } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { ICreateOrderRequest } from "../dtos/requests/ICreateOrderRequest.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

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
