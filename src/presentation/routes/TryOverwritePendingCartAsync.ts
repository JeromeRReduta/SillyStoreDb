import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem.ts";
import { IMergePendingCartItemsRequest } from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import HttpStatus from "../../application/http/HttpStatus.ts";

export default async function tryOverwritePendingCartAsync(
    req: ExpressRequest<
        object,
        null,
        { cartItems: Array<Pick<ICartItem, "productId" | "quantity">> }
    >,
    res: ExpressResponse<null>,
    next: NextFunction,
): Promise<void> {
    try {
        const { cartItemClientService: service } = apiConfigs.services;
        const {
            userInfo: { id: creatorId, role },
            body: { cartItems },
        } = req;
        const dto: IMergePendingCartItemsRequest = {
            role,
            creatorId,
            cartItems,
        };
        await service.overwritePendingCart(dto);
        res.status(HttpStatus.EMPTY).send(null);
    } catch (e) {
        next(e);
    }
}
