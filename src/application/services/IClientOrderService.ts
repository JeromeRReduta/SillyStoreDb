import { IAddProductToOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";

export interface IClientOrderService {
    // note: DON'T make generic CrudService, as each service as different things it needs to do
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;
    getAllOwnedAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;
    getAsync(dto: IGetOrderRequest): Promise<IOrderResponse>;
    addProductToOrderAsync(
        dto: IAddProductToOrderRequest,
    ): Promise<IOrderProductResponse>;
    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;
    getProductsInCartAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IProductResponse[] | null>;
}
