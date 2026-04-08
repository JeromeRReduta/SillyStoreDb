import { ICreateProductRequest } from "../../application/dtos/requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../application/dtos/requests/IDeleteProductRequest.ts";
import { IGetAllProductsRequest } from "../../application/dtos/requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../application/dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../application/dtos/requests/IGetProductRequest.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";
import { IOrderProductDao } from "../../infrastructure/psql/data_access/IOrderProductDao.ts";
import { IProductDao } from "../../infrastructure/psql/data_access/IProductDao.ts";
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

    async createAsync(dto: ICreateProductRequest): Promise<IProductResponse> {
        throw new Error("Method not implemented.");
    }

    async getAllAsync(
        dto: IGetAllProductsRequest,
    ): Promise<IProductResponse[]> {
        return await this.productDao.getAllAsync(dto);
    }

    async getAsync(dto: IGetProductRequest): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(
        dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]> {
        throw new Error("Method not implemented.");
    }
}
