import { ICreateOrderProductRequest } from "../../application/dtos/requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../application/dtos/requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../application/dtos/requests/IGetAllOrderProductsRequest.ts";
import { IGetOrderProductRequest } from "../../application/dtos/requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../application/dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../application/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";

export interface IOrderProductDao {
    createAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse>;

    getAllAsync(
        dto: IGetAllOrderProductsRequest,
    ): Promise<IOrderProductResponse>;

    getAsync(dto: IGetOrderProductRequest): Promise<IOrderProductDao | null>;

    deleteAsync(
        dto: IDeleteOrderProductRequest,
    ): Promise<IOrderProductResponse>;

    getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;

    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;
}
