import { ICreateProductRequest } from "../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetProductRequest } from "../../application/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";
import { IGenericDao } from "./IGenericDao.ts";

export type IProductDao = IGenericDao<
    ICreateProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IDeleteProductRequest,
    IProductResponse
>;
