import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import {
    IOrderResponse,
    IUpdatePendingOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryUpdatePendingOrderAsync(
    req: ExpressRequest<
        object,
        IOrderResponse,
        { dateStr: string; status: OrderStatus }
    >,
    res: ExpressResponse<IOrderResponse>,
    next: NextFunction,
): Promise<void> {
    try {
        const { orderClientService: service } = apiConfigs.services;
        const {
            userInfo: { id: userId, role },
            body: { dateStr, status },
        } = req;
        const dto: IUpdatePendingOrderRequest = {
            userId,
            role,
            dateStr,
            status,
        };
        const updatedPendingOrder: IOrderResponse =
            await service.updatePendingOrder(dto);
        res.status(HttpStatus.OK).send(updatedPendingOrder);
    } catch (e) {
        next(e);
    }
}
