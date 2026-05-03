import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";

import HttpStatus from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import {
    IOrderResponse,
    IGetOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";

export default async function tryGetOwnedOrderAsync(
    req: ExpressRequest<{ id: string }, IOrderResponse, object>,
    res: ExpressResponse<IOrderResponse>,
    next: NextFunction,
) {
    try {
        const { orderClientService: service } = apiConfigs.services;
        const {
            params: { id },
            userInfo: { id: userId, role },
        } = req;
        const dto: IGetOrderRequest = {
            id: parseInt(id),
            userId,
            role,
        };
        const order = await service.getOwnedByIdAsync(dto);
        res.status(HttpStatus.OK).send(order);
    } catch (e) {
        next(e);
    }
}
