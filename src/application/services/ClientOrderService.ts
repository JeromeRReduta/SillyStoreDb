import {
    ICreateOrderRequest,
    IOrderResponse,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IGetAllPendingOrdersRequest,
    IUpdatePendingOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import HttpError from "../../errors/HttpError.ts";
import { IOrderDao } from "../../infrastructure/data_access/IOrderDao.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IOrderClientService } from "./IOrderClientService.ts";

export default class OrderClientService implements IOrderClientService {
    private orderDao: IOrderDao;

    constructor(orderDao: IOrderDao) {
        this.orderDao = orderDao;
    }

    async createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse> {
        return await this.orderDao.createAsync(dto);
    }

    async getAllOwnedAsync(
        dto: IGetAllOrdersRequest,
    ): Promise<IOrderResponse[]> {
        return await this.orderDao.getAllAsync(dto);
    }

    async getOwnedByIdAsync(dto: IGetOrderRequest): Promise<IOrderResponse> {
        const found: IOrderResponse | null = await this.orderDao.getAsync(dto);
        if (!found) {
            throw new HttpError(HttpStatus.NOT_FOUND, "No match!");
        }
        if (found.userId !== dto.userId) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You must own this order to view it!",
            );
        }
        return found;
    }

    async getPendingAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IOrderResponse> {
        const pendingOrders: IOrderResponse[] =
            await this.orderDao.getAllPendingOrdersAsync(dto);
        if (pendingOrders.length === 0) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "You do not have a pending order!",
            );
        }
        if (pendingOrders.length > 1) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You're not supposed to have multiple pending orders! Are you an admin?",
            );
        }
        return pendingOrders[0];
    }

    async updatePendingOrder(
        dto: IUpdatePendingOrderRequest,
    ): Promise<IOrderResponse> {
        const updated: IOrderResponse | null =
            await this.orderDao.updatePendingOrderAsync(dto);
        if (!updated) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "You do not have a pending order!",
            );
        }
        return updated;
    }
}
