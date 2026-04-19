import { Request, Response } from "express";
import { NextFunction } from "express";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IGetProductsInOrderRequest.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
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
            const { clientOrderService } = apiConfigs.services;
            const dto: IGetProductsInOrderRequest = {
                orderId: parseInt(req.params.id),
                userId: req.userId!,
                includingQuantities,
            };
            const productsInOrder: IProductResponse[] =
                await clientOrderService.getProductsInOrderAsync(dto);
            res.status(HttpStatus.OK).send(productsInOrder);
        } catch (e) {
            next(e);
        }
    };
}
