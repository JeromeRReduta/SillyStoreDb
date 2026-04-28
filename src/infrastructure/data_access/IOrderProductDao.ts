import {
    IGetAllPendingOrdersRequest,
    IOrderResponse,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import {
    ICreateOrderProductRequest,
    IGetAllOrderProductsRequest,
    IGetOrderProductRequest,
    IUpdateOrderProductRequest,
    IDeleteOrderProductRequest,
    IOrderProductResponse,
    IGetOrdersIncludingProductRequest,
    IGetProductsInOrderRequest,
    IMergeOrderProductsinOrderRequest,
    IMergeOrderProductsInPendingOrderRequest,
} from "../../../SillyStoreCommon/dtos/orderProductDtos.ts";
import {
    IProductResponse,
    IProductWithQuantityResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
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

    getCartItemsAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;

    getPendingCartItemsAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;

    // note: These should return updated rows - to get full order product list, should run get again
    mergeCartItems(dto: IFirst): Promise<IOrderProductResponse[]>;

    // should return updated rows
    mergePendingCartItems(
        dto: IMergeOrderProductsinOrderRequest,
    ): Promise<IOrderProductResponse[]>;
    mergePendingOrderProductsAsync(
        dto: IMergeOrderProductsInPendingOrderRequest,
    ): Promise<IOrderProductResponse[]>;
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
