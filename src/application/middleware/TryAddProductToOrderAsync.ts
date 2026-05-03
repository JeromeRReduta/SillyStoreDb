import { Request, Response } from "express";
import { NextFunction } from "express";
import { IAddProductToOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IAddProductToOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import HttpStatus from "../http/HttpStatus.ts";

export default async function tryAddProductToOrderAsync(
    req: Request<
        { id: string },
        IOrderProductResponse,
        { productId: number; quantity: number }
    >,
    res: Response<IOrderProductResponse>,
    next: NextFunction,
): Promise<void> {
    try {
        const { clientOrderService } = apiConfigs.services;
        const dto: IAddProductToOrderRequest = {
            orderId: parseInt(req.params.id),
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.userId!,
        };
        const created: IOrderProductResponse =
            await clientOrderService.addProductToOrderAsync(dto);
        res.status(HttpStatus.OK).send(created);
    } catch (e) {
        next(e);
    }
}

/**
 * 
 * req: Request<{ id: string }, IProductResponse[], object>,
    res: Response<IProductResponse[]>,
    next: NextFunction,
 */
