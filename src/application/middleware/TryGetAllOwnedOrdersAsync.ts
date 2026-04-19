import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
export default async function tryGetAllOwnedOrdersAsync(
    req: Request<object, IOrderResponse[], object>,
    res: Response<IOrderResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const { clientOrderService } = apiConfigs.services;
        const userId: number = req.userId!;
        const ownedOrders: IOrderResponse[] =
            await clientOrderService.getAllOwnedAsync({ userId });
        res.status(HttpStatus.OK).send(ownedOrders);
    } catch (e) {
        next(e);
    }
}
