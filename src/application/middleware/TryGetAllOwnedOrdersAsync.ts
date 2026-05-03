import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import {
    IGetAllOrdersRequest,
    IOrderResponse,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import HttpStatus from "../http/HttpStatus.ts";

export default async function tryGetAllOwnedOrdersAsync(
    req: ExpressRequest<object, IOrderResponse[], object>,
    res: ExpressResponse<IOrderResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const { orderClientService: service } = apiConfigs.services;
        const { id: userId, role } = req.userInfo;
        const dto: IGetAllOrdersRequest = { userId, role };
        const ownedOrders: IOrderResponse[] =
            await service.getAllOwnedAsync(dto);
        res.status(HttpStatus.OK).send(ownedOrders);
    } catch (e) {
        next(e);
    }
}
