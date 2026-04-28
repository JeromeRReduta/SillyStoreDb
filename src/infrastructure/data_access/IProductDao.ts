import {
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
import { ICrudDao } from "./ICrudDao.ts";

export type IProductDao = ICrudDao<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse
>;
