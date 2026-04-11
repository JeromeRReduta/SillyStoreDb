import { IAddProductToOrderRequest } from "../../application/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderProductRequest } from "../../application/dtos/requests/ICreateOrderProductRequest.ts";
import { ICreateOrderRequest } from "../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../application/dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../application/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../application/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../application/dtos/responses/IProductResponse.ts";
import { IOrderDao } from "../../infrastructure/data_access/IOrderDao.ts";
import { IOrderProductDao } from "../../infrastructure/data_access/IOrderProductDao.ts";
import { IOrderRepository } from "./IOrderRepository.ts";

export default class OrderRepository implements IOrderRepository {
    private orderDao: IOrderDao;
    private orderProductDao: IOrderProductDao;

    constructor(orderDao: IOrderDao, orderProductDao: IOrderProductDao) {
        this.orderDao = orderDao;
        this.orderProductDao = orderProductDao;
    }

    async createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse> {
        return await this.orderDao.createAsync(dto);
    }

    async getAllAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]> {
        return await this.orderDao.getAllAsync(dto);
    }

    async getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null> {
        return await this.orderDao.getAsync(dto);
    }

    async deleteAsync(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _dto: IDeleteOrderRequest,
    ): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }

    async addProductToOrderAsync(
        dto: IAddProductToOrderRequest,
    ): Promise<IOrderProductResponse> {
        const createOrderProductRequest: ICreateOrderProductRequest = dto; // done in case the two requests are de-synced for some reason
        return await this.orderProductDao.createAsync(
            createOrderProductRequest,
        );
    }

    async getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]> {
        return this.orderProductDao.getProductsInOrderAsync(dto);
    }
}
