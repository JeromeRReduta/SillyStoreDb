import { ICreateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrderProductsRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IGenericDao } from "./IGenericDao.ts";

export interface IOrderProductDao extends IGenericDao<
    ICreateOrderProductRequest,
    IGetAllOrderProductsRequest,
    IGetOrderProductRequest,
    IDeleteOrderProductRequest,
    IOrderProductResponse
> {
    getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;

    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;

    getProductsInCartAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IProductResponse[]>;
}
