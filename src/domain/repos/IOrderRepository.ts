import { ICreateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IGenericRepository } from "./ICrudRepository.ts";

export interface IOrderRepository extends IGenericRepository<
    ICreateOrderRequest,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IDeleteOrderRequest,
    IOrderResponse
> {
    createOrderProductAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse>;
    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;

    getProductsInCartAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IProductResponse[]>;
}
