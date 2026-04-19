import { NextFunction, Request, Response } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

export default async function tryGetOrdersIncludingProductAsync(
    req: Request<{ id: string }, IOrderResponse[], object>,
    res: Response<IOrderResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const { clientProductService } = apiConfigs.services;

        const userId: number = req.userId!;
        const productId: number = parseInt(req.params.id);
        const orders: IOrderResponse[] =
            await clientProductService.getOrdersIncludingProductAsync({
                userId,
                productId,
            });
        res.status(HttpStatus.OK).send(orders);
    } catch (e) {
        next(e);
    }
}
