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
        const { orderClientService, cartItemClientService } =
            apiConfigs.services;
        const { id, role } = req.userInfo;
        await orderClientService.getPendingAsync({ userId: id, role }); // will throw 404 if no pending order - code smell? maybe separate returning response from getting data?
        const dto: IGetPendingCartItemsRequest = { creatorId: id, role };
        const pendingCartItems: ICartItemResponse[] =
            await cartItemClientService.getPendingCartItemsAsync(dto);
        res.status(HttpStatus.OK).send(pendingCartItems);
    } catch (e) {
        next(e);
    }
}
