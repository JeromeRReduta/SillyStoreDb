import { ICreateProductRequest } from "../../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../application/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../application/dtos/responses/IProductResponse.ts";

export interface IProductDao {
    createAsync(dto: ICreateProductRequest): Promise<IProductResponse>;
    getAllAsync(dto: IGetAllProductsRequest): Promise<IProductResponse[]>;
    getAsync(dto: IGetProductRequest): Promise<IProductResponse | null>;
    deleteAsync(dto: IDeleteProductRequest): Promise<IProductResponse | null>;
}
