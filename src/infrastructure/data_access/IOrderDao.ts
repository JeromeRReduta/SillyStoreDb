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
}
