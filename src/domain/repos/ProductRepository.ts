import { ICreateProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateProductRequest.ts";
import { IDeleteProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductRequest.ts";
import { IUpdateProductRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateProductRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IOrderProductDao } from "../../infrastructure/data_access/ICartItemDao.ts";
import { IProductDao } from "../../infrastructure/data_access/IProductDao.ts";
import CrudRepositories from "./CrudRepositories.ts";
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
        return await CrudRepositories.createAsync({
            dao: this.productDao,
            dto,
        });
    }

    async getAllAsync(dto: object): Promise<IProductResponse[]> {
        return await CrudRepositories.getAllAsync({
            dao: this.productDao,
            dto,
        });
    }

    async getAsync(dto: IGetProductRequest): Promise<IProductResponse | null> {
        return await CrudRepositories.getAsync({ dao: this.productDao, dto });
    }

    async updateAsync(
        dto: IUpdateProductRequest,
    ): Promise<IProductResponse | null> {
        return await CrudRepositories.updateAsync({
            dao: this.productDao,
            dto,
        });
    }

    async deleteAsync(
        dto: IDeleteProductRequest,
    ): Promise<IProductResponse | null> {
        return await CrudRepositories.deleteAsync({
            dao: this.productDao,
            dto,
        });
    }

    async getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]> {
        return await this.orderProductDao.getOrdersIncludingProductAsync(dto);
    }
}
