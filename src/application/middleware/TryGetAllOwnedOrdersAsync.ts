import { Request, Response, NextFunction } from "express";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import services from "../../configs/BackendConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryGetAllOwnedOrdersAsync(
    req: Request<object, IOrderResponse[], object>,
    res: Response<IOrderResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const userId: number = req.userId!;
        const ownedOrders: IOrderResponse[] =
            await services.clientOrderService.getAllOwnedAsync({ userId });
        res.status(HttpStatus.OK).send(ownedOrders);
    } catch (e) {
        next(e);
    }
}
