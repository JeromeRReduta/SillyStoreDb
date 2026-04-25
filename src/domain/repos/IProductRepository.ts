import { ICreateProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IUpdateProductRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateProductRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { ICrudRepository } from "./ICrudRepository.ts";

export interface IProductRepository extends ICrudRepository<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse
> {
    getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;
}
