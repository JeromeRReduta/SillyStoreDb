import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import {
    IOrderResponse,
    IGetAllPendingOrdersRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";

export default async function tryGetPendingOrderAsync(
    req: ExpressRequest<object, IOrderResponse | null, object>,
    res: ExpressResponse<IOrderResponse | null>,
    next: NextFunction,
): Promise<void> {
    try {
        const { orderClientService: service } = apiConfigs.services;
        const { id: userId, role } = req.userInfo;
        const dto: IGetAllPendingOrdersRequest = {
            userId,
            role,
        };
        const pendingOrders: IOrderResponse | null =
            await service.getPendingAsync(dto);
        res.status(HttpStatus.OK).send(pendingOrders);
    } catch (e) {
        next(e);
    }
}
