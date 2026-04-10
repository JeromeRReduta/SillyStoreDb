import { IAddOrderToProductRequest } from "../../application/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../application/dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../application/dtos/requests/IGetProductsInOrder.ts";
import { IOrderProductResponse } from "../../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";

export interface IOrderRepository {
    // todo: make ICrudRepository
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;
    getAllAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;
    getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null>;
    deleteAsync(dto: IDeleteOrderRequest): Promise<IOrderResponse | null>;
    addProductToOrderAsync(
        dto: IAddOrderToProductRequest,
    ): Promise<IOrderProductResponse>; // TODO: change to "add product to order request"
    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;
}
