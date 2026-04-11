import { NextFunction, Request, Response } from "express";
import { IOrderProductResponse } from "../dtos/responses/IOrderProductResponse.ts";
import { IAddProductToOrderRequest } from "../dtos/requests/IAddProductToOrderRequest.ts";
import services from "../../configs/BackendConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

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
        const dto: IAddProductToOrderRequest = {
            orderId: parseInt(req.params.id),
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.userId!,
        };
        const created: IOrderProductResponse =
            await services.clientOrderService.addProductToOrderAsync(dto);
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
