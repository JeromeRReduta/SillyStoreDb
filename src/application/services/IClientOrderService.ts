import { ICreateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";

export interface IClientOrderService {
    // note: DON'T make generic CrudService, as each service as different things it needs to do
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;

    getAllOwnedAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;

    getAsync(dto: IGetOrderRequest): Promise<IOrderResponse>;

    addProductToOrderAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse>;

    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;

    getMyPendingOrderAsync( // note - repo call gets all pending orders, filtered by user. For client, this will return 0 or 1 order
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IProductResponse[] | null>;

    getProductsInMyCartAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;
}
