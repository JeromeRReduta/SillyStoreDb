import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderRequest.ts";
import { IUpdateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateOrderRequest.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
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
        getPendingOrderRequest: IGetAllPendingOrdersRequest,
    ): Promise<IOrderResponse | null>;
}
