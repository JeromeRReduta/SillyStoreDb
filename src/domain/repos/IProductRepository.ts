import {
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
import { ICrudRepository } from "./ICrudRepository.ts";

export type IProductRepository = ICrudRepository<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse
>;
