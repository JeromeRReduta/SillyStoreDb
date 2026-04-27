import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryGetPendingProductsAsync(
    req: ExpressRequest<object, IProductWithQuantityResponse[], object>,
    res: ExpressResponse<IProductWithQuantityResponse[]>,
    next: NextFunction,
): Promise<void> {
    try {
        const dto: IGetProductsInOrderRequest = {
            orderId: 0,
            userId: req.userId!,
            includingQuantities: false,
        };
        const productsWithQuantitiesInOrder: IProductWithQuantityResponse[] =
            await apiConfigs.services.clientOrderService.getProductsWithQuantitiesInPendingOrderAsync(
                dto,
            );
        res.status(HttpStatus.OK).send(productsWithQuantitiesInOrder);
    } catch (e) {
        next(e);
    }
}
