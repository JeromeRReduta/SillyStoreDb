import { ICreateProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IUpdateProductRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateProductRequest.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { ICrudDao } from "./ICrudDao.ts";

export type IProductDao = ICrudDao<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IUpdateProductRequest,
    IDeleteProductRequest,
    IProductResponse
>;
