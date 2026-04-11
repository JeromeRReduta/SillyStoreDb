import { NextFunction, Request, Response } from "express";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import { IGetProductsInOrderRequest } from "../dtos/requests/IGetProductsInOrderRequest.ts";
import services from "../../configs/BackendConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default function tryGetProductsInOrder(
    includingQuantities: boolean,
): (
    req: Request<{ id: string }, IProductResponse[], object>,
    res: Response<IProductResponse[]>,
    next: NextFunction,
) => Promise<void> {
    return async function (
        req: Request<{ id: string }, IProductResponse[], object>,
        res: Response<IProductResponse[]>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const dto: IGetProductsInOrderRequest = {
                orderId: parseInt(req.params.id),
                userId: req.userId!,
                includingQuantities,
            };
            const productsInOrder: IProductResponse[] =
                await services.clientOrderService.getProductsInOrderAsync(dto);
            res.status(HttpStatus.OK).send(productsInOrder);
        } catch (e) {
            next(e);
        }
    };
}
