import { ICreateProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IGenericDao } from "./IGenericDao.ts";

export type IProductDao = IGenericDao<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IDeleteProductRequest,
    IProductResponse
>;
