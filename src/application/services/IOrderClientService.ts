import {
    ICreateOrderRequest,
    IOrderResponse,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IGetAllPendingOrdersRequest,
    IUpdatePendingOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";

export interface IOrderClientService {
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;

    getAllOwnedAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;

    getOwnedByIdAsync(dto: IGetOrderRequest): Promise<IOrderResponse>;

    getPendingAsync(dto: IGetAllPendingOrdersRequest): Promise<IOrderResponse>;

    updatePendingOrder(
        dto: IUpdatePendingOrderRequest,
    ): Promise<IOrderResponse>;
}
