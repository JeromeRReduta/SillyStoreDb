import Express from "express";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/IGetAllPendingOrdersRequest.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

type ICartItem = IProductResponse & { quantity: number };

export default function tryGetProductsInCartAsync(): (
    req: Express.Request<object, ICartItem[], object>,
    res: Express.Response<ICartItem[]>,
    next: Express.NextFunction,
) => Promise<void> {
    return async function (
        req: Express.Request<object, ICartItem[], object>,
        res: Express.Response<ICartItem[]>,
        next: Express.NextFunction,
    ): Promise<void> {
        try {
            const { clientOrderService } = apiConfigs.services;
            const dto: IGetAllPendingOrdersRequest = {
                userId: req.userId!,
            };
            const productsInCart: IProductResponse[] =
                await clientOrderService.getProductsInCartAsync(dto);
            res.status(HttpStatus.OK).send(productsInCart);
        } catch (e) {
            next(e);
        }
    };
}

// export default function tryGetProductsInOrder(
//     includingQuantities: boolean,
// ): (
//     req: Request<{ id: string }, IProductResponse[], object>,
//     res: Response<IProductResponse[]>,
//     next: NextFunction,
// ) => Promise<void> {
//     return async function (
//         req: Request<{ id: string }, IProductResponse[], object>,
//         res: Response<IProductResponse[]>,
//         next: NextFunction,
//     ): Promise<void> {
//         try {
//             const { clientOrderService } = apiConfigs.services;
//             const dto: IGetProductsInOrderRequest = {
//                 orderId: parseInt(req.params.id),
//                 userId: req.userId!,
//                 includingQuantities,
//             };
//             const productsInOrder: IProductResponse[] =
//                 await clientOrderService.getProductsInOrderAsync(dto);
//             res.status(HttpStatus.OK).send(productsInOrder);
//         } catch (e) {
//             next(e);
//         }
//     };
// }
