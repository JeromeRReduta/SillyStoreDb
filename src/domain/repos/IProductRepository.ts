import { ICreateProductRequest } from "../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../application/dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../application/dtos/requests/IGetProductRequest.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";
import { IGenericRepository } from "./ICrudRepository.ts";

export interface IProductRepository extends IGenericRepository<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IDeleteProductRequest,
    IProductResponse
> {
    getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;
}
