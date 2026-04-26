import { ICreateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IUpdateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";
import { IOrderDao } from "../../infrastructure/data_access/IOrderDao.ts";
import { IOrderProductDao } from "../../infrastructure/data_access/IOrderProductDao.ts";
import { IOrderRepository } from "./IOrderRepository.ts";
import CrudRepositories from "./CrudRepositories.ts";

export default class OrderRepository implements IOrderRepository {
    private orderDao: IOrderDao;
    private orderProductDao: IOrderProductDao;

    constructor(orderDao: IOrderDao, orderProductDao: IOrderProductDao) {
        this.orderDao = orderDao;
        this.orderProductDao = orderProductDao;
    }

    async createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse> {
        return await CrudRepositories.createAsync({ dao: this.orderDao, dto });
    }

    async getAllAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        return await CrudRepositories.getAllAsync({ dao: this.orderDao, dto });
    }

    async getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null> {
        return await CrudRepositories.getAsync({ dao: this.orderDao, dto });
    }

    async updateAsync(
        dto: IUpdateOrderRequest,
    ): Promise<IOrderResponse | null> {
        return await CrudRepositories.updateAsync({ dao: this.orderDao, dto });
    }

    async deleteAsync(
        dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        return await CrudRepositories.deleteAsync({ dao: this.orderDao, dto });
    }

    async createOrderProductAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse> {
        return await CrudRepositories.createAsync({
            dao: this.orderProductDao,
            dto,
        });
    }

    async getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]> {
        return await this.orderProductDao.getProductsInOrderAsync(dto);
    }

    async getProductsWithQuantitiesInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]> {
        return await this.orderProductDao.getProductsWithQuantitiesAsync(dto);
    }

    async getAllPendingOrdersAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IOrderResponse[]> {
        return await this.orderDao.getAllPendingOrdersAsync(dto);
    }
}
