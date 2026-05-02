import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import {
    IOrderResponse,
    ICreateOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";

export default async function tryCreateOrderAsync(
    req: ExpressRequest<object, IOrderResponse, { dateStr: string }>,
    res: ExpressResponse<IOrderResponse>,
    next: NextFunction,
): Promise<void> {
    try {
        const { orderClientService: service } = apiConfigs.services;
        const {
            userInfo: { id: userId, role },
            body: { dateStr },
        } = req;
        const dto: ICreateOrderRequest = {
            userId,
            role,
            dateStr,
            status: "pending",
        };
        const created: IOrderResponse = await service.createAsync(dto);
        res.status(HttpStatus.CREATED).send(created);
    } catch (e) {
        next(e);
    }
}
