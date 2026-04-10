import { ICreateOrderRequest } from "../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../application/dtos/requests/IGetOrderRequest.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";

export interface IOrderDao {
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;
    getAllAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;
    getAsync(dto: IGetOrderRequest): Promise<IGetOrderRequest | null>;
    deleteAsync(dto: IDeleteOrderRequest): Promise<IGetOrderRequest>;
}
