import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";

export default async function tryGetPendingOrderAsync(
    req: ExpressRequest<object, IOrderResponse | null, object>,
    res: ExpressResponse<IOrderResponse | null>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): Promise<void> {
    const dto: IGetAllPendingOrdersRequest = {
        userId: req.userId!,
    };
    const pendingOrders: IOrderResponse | null =
        await apiConfigs.services.clientOrderService.getPendingOrderAsync(dto);
    res.status(HttpStatus.OK).send(pendingOrders);
}
