/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICreateProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IUpdateProductRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateProductRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IOrderProductDao } from "../../infrastructure/data_access/IOrderProductDao.ts";
import { IProductDao } from "../../infrastructure/data_access/IProductDao.ts";
import { IProductRepository } from "./IProductRepository.ts";

export default class ProductRepository implements IProductRepository {
    orderProductDao: IOrderProductDao;
    productDao: IProductDao;

    constructor({
        orderProductDao,
        productDao,
    }: {
        orderProductDao: IOrderProductDao;
        productDao: IProductDao;
    }) {
        this.orderProductDao = orderProductDao;
        this.productDao = productDao;
    }

    async createAsync(_dto: ICreateProductRequest): Promise<IProductResponse> {
        throw new Error("Method not implemented.");
    }

    async getAllAsync(
        dto: IGetAllProductsRequest,
    ): Promise<IProductResponse[]> {
        return await this.productDao.getAllAsync(dto);
    }

    async getAsync(dto: IGetProductRequest): Promise<IProductResponse | null> {
        return await this.productDao.getAsync(dto);
    }

    updateAsync(_dto: IUpdateProductRequest): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        _dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]> {
        return await this.orderProductDao.getOrdersIncludingProductAsync(dto);
    }
}
