import { NextFunction, Request, Response } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IGetOrderRequest } from "../dtos/requests/IGetOrderRequest.ts";

import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

export default async function tryGetOwnedOrderAsync(
    req: Request<{ id: string }, IOrderResponse, object>,
    res: Response<IOrderResponse>,
    next: NextFunction,
) {
    try {
        const { clientOrderService } = apiConfigs.services;

        const dto: IGetOrderRequest = {
            orderId: parseInt(req.params.id),
            userId: req.userId!,
        };
        const order = await clientOrderService.getAsync(dto);
        res.status(HttpStatus.OK).send(order);
    } catch (e) {
        next(e);
    }
}
