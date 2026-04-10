import { IAddProductToOrderRequest } from "../../application/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../application/dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../application/dtos/requests/IGetProductsInOrder.ts";
import { IOrderProductResponse } from "../../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";
import { IGenericRepository } from "./ICrudRepository.ts";

export interface IOrderRepository extends IGenericRepository<
    ICreateOrderRequest,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IDeleteOrderRequest,
    IOrderResponse
> {
    addProductToOrderAsync(
        dto: IAddProductToOrderRequest,
    ): Promise<IOrderProductResponse>;
    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;
}
