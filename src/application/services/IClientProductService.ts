import { IGetAllProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";

export interface IClientProductService {
    getAllAsync(dto: IGetAllProductsRequest): Promise<IProductResponse[]>;

    getAsync(dto: IGetProductRequest): Promise<IProductResponse>;

    getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;
}
