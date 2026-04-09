import { IGetAllProductsRequest } from "../dtos/requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../dtos/requests/IGetProductRequest.ts";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";

export interface IClientProductService {
    getAllAsync(dto: IGetAllProductsRequest): Promise<IProductResponse[]>;
    getAsync(dto: IGetProductRequest): Promise<IProductResponse>;
    getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;
}
