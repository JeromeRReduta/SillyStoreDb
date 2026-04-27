import { ICreateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateOrderProductRequest.ts";
import { IDeleteOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteOrderProductRequest.ts";
import { IGetAllOrderProductsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllOrderProductsRequest.ts";
import { IGetOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrderProductRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetProductsInOrderRequest.ts";
import { IUpdateOrderProductRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateOrderProductRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";
import { ICrudDao } from "./ICrudDao.ts";

export interface IOrderProductDao extends ICrudDao<
    ICreateOrderProductRequest,
    IGetAllOrderProductsRequest,
    IGetOrderProductRequest,
    IUpdateOrderProductRequest,
    IDeleteOrderProductRequest,
    IOrderProductResponse
> {
    getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;

    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;

    getProductsWithQuantitiesAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;

    getProductsWithQuantitiesInPendingOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;
    // note: These should return updated rows - to get full order product list, should run get again
    mergeOrderProductsByOrderId(dto: IFirst): Promise<IOrderProductResponse[]>;

    mergeOrderProductsInPendingOrder(
        dto: ISecond,
    ): Promise<IOrderProductResponse>;
    /** TODO: Sillystore common:
    * 
    * simplify dtos:
    *  Make use of Pick<TResponse or TDto> and Partial<TResponse or TDto> as necessary
    *  https://www.typescriptlang.org/docs/handbook/utility-types.html
    *   ESPECIALLY for update dtos
    *   make dtos for:
        dto: merge order products by order id
        dto: merge order products in pending order
        dto: get products with quantities
        dto: get products with quantities in pending order

    
        Then, figure out how to implement merge order products
        test for orderproduct dao, then order repo, then client order service

        THEN can finally fkin go to frontend
    * * 
    * 
    */

    /**
     * interface IUpdatePendingOrderRequest:
     *  // literally just = IUpdateOrderProductRequest[]
     *
     * 1. general sense:
     *  merge orderProducts w/ specific order (i.e. based on order.id)
     *  merge orderProducts w/ pending order
     */
}

const thing: Partial<IProductResponse>;

interface IFirst {
    readonly orderId: number;
    readonly productsAndQuantities: {
        readonly productId: number;
        readonly quantity: number;
    }[];
}

interface ISecond {
    readonly productsAndQuantities: Array<{
        readonly productId: number;
        readonly quantity: number;
    }>;
}
