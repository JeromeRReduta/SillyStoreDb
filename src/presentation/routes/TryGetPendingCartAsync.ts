import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import {
    ICartItemResponse,
    IGetPendingCartItemsRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import HttpStatus from "../../application/http/HttpStatus.ts";

export default async function tryGetPendingCartAsync(
    req: ExpressRequest<object, ICartItemResponse[], object>,
    res: ExpressResponse<ICartItemResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const { cartItemClientService: service } = apiConfigs.services;
        const { id: creatorId, role } = req.userInfo;
        const dto: IGetPendingCartItemsRequest = { creatorId, role };
        const pendingCartItems: ICartItemResponse[] =
            await service.getPendingCartItemsAsync(dto);
        res.status(HttpStatus.OK).send(pendingCartItems);
    } catch (e) {
        next(e);
    }
}
