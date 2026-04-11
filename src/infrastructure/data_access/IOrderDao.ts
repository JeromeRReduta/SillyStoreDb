import { ICreateOrderRequest } from "../../application/dtos/requests/ICreateOrderRequest.ts";
import { IDeleteOrderRequest } from "../../application/dtos/requests/IDeleteOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../application/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../../application/dtos/requests/IGetOrderRequest.ts";
import { IOrderResponse } from "../../application/dtos/responses/IOrderResponse.ts";
import { IGenericDao } from "./IGenericDao.ts";

export type IOrderDao = IGenericDao<
    ICreateOrderRequest,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IDeleteOrderRequest,
    IOrderResponse
>;
