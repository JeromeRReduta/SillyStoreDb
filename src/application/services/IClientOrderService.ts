import { IAddOrderToProductRequest } from "../dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../dtos/requests/IGetProductsInOrder.ts";
import { IOrderProductResponse } from "../dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";

export interface IClientOrderService {
    // note: DON'T make generic CrudService, as each service as different things it needs to do
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;
    getAllOwnedAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;
    getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null>;
    addProductToOrderAsync(
        dto: IAddOrderToProductRequest,
    ): Promise<IOrderProductResponse>;
    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;
}
