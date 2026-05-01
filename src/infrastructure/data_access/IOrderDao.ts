import { IOrder } from "../../../SillyStoreCommon/domain-objects/Order.ts";
import {
    ICreateOrderRequest,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IUpdateOrderRequest,
    IDeleteOrderRequest,
    IOrderResponse,
    IGetAllPendingOrdersRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import { ICrudDao } from "./ICrudDao.ts";

export interface IOrderDao extends ICrudDao<
    ICreateOrderRequest,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IUpdateOrderRequest,
    IDeleteOrderRequest,
    IOrderResponse
> {
    getAllPendingOrdersAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IOrderResponse[]>;
    updatePendingOrderAsync(
        dto: IUpdatePendingOrderRequest,
    ): Promise<IOrderResponse | null>;
}

// TODO: put this in common dtos
export type IUpdatePendingOrderRequest = Omit<IUpdateOrderRequest, "id">;
