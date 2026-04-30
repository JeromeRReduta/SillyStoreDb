import {
    ICreateCartItemRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IUpdateCartItemRequest,
    IDeleteCartItemRequest,
    ICartItemResponse,
    IGetOrdersIncludingProductRequest,
    IMergeCartItemsRequest,
    IMergePendingCartItemsRequest,
    IGetPendingCartItemsRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/productDtos.ts";
import { ICrudDao } from "./ICrudDao.ts";

export interface ICartItemDao extends ICrudDao<
    ICreateCartItemRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IUpdateCartItemRequest,
    IDeleteCartItemRequest,
    ICartItemResponse
> {
    getAllPendingCartItemsAsync(
        dto: IGetPendingCartItemsRequest,
    ): Promise<ICartItemResponse[]>;

    getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]>;

    // TODO: make dtos for these 2
    getProductsInOrderAsync(
        dto: object,
    ): Promise<IProductWithQuantityResponse[]>;

    getProductsInPendingOrderAsync(
        dto: object,
    ): Promise<IProductWithQuantityResponse[]>;

    // note: These should return updated rows - to get full order product list, should run get again
    mergeCartItemsAsync(
        dto: IMergeCartItemsRequest,
    ): Promise<ICartItemResponse[]>;

    mergePendingCartItemsAsync(
        dto: IMergePendingCartItemsRequest,
    ): Promise<ICartItemResponse[]>;
    /** TODO: Sillystore common:
    * 
    * simplify dtos:
    *  Make use of Pick<TResponse or TDto> and Partial<TResponse or TDto> as necessary
    *  https://www.typescriptlang.org/docs/handbook/utility-types.html
    *   ESPECIALLY for update dtos
    *   make dtos for:
        (x) dto: merge order products by order id
        (x) dto: merge order products in pending order
        (x) dto: get products with quantities
        (x) dto: get products with quantities in pending order
        Note - for any order product request, jsut return products w/ quantities
    
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
