import { NextFunction, Request, Response } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IGetOrderRequest } from "../dtos/requests/IGetOrderRequest.ts";
import services from "../../configs/BackendConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryGetOwnedOrderAsync(
    req: Request<{ id: string }, IOrderResponse, object>,
    res: Response<IOrderResponse>,
    next: NextFunction,
) {
    try {
        const dto: IGetOrderRequest = {
            orderId: parseInt(req.params.id),
            userId: req.userId!,
        };
        const order = await services.clientOrderService.getAsync(dto);
        res.status(HttpStatus.OK).send(order);
    } catch (e) {
        next(e);
    }
}
