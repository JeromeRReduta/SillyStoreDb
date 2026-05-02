import {
    ICreateCartItemRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IUpdateCartItemRequest,
    IDeleteCartItemRequest,
    ICartItemResponse,
    IGetPendingCartItemsRequest,
    IMergePendingCartItemsRequest,
    IMergeCartItemsInOrderRequest,
    IGetCartItemsInOrderRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import { ICrudDao } from "./ICrudDao.ts";

export interface ICartItemDao extends ICrudDao<
    ICreateCartItemRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IUpdateCartItemRequest,
    IDeleteCartItemRequest,
    ICartItemResponse
> {
    /**
     * Gets all cart items from pending order. If no pending order exists, throws an error
     * @param {IGetPendingCartItemsRequest} dto
     * @throws {HttpError} if no pending order exists
     * @returns {Promise<ICartItemResponse[]>} all cart items from pending order
     */
    getAllPendingAsync(
        dto: IGetPendingCartItemsRequest,
    ): Promise<ICartItemResponse[]>;

    /** Gets all cart items from a specific order. If no such order exists, throws an error
     * @param {IGetCartItemsInOrderRequest} dto
     * @throws {HttpError} if no pending order exists
     * @returns {Promise<ICartItemResponse[]>} all cart items from order
     */
    getAllInOrderAsync(
        dto: IGetCartItemsInOrderRequest,
    ): Promise<ICartItemResponse[]>;

    /**
     * Merges all cart items in dto into a given order's cart
     * @param dto
     * @returns {Promise<ICartItemResponse[]>} modified entries
     */
    mergeCartInOrderAsync(
        dto: IMergeCartItemsInOrderRequest,
    ): Promise<ICartItemResponse[]>;

    /**
     * Merge all cart items in dto into the user's pending order. If no pending order exists, this
     * will CREATE A NEW PENDING ORDER.
     * @param dto
     * @returns {Promise<ICartItemResponse[]>} modified entries
     */
    mergePendingCartAsync(
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
    
        (x) Then, figure out how to implement merge order products
        test for orderproduct dao, then order repo, then client order service

        THEN can finally fkin go to frontend
    * * 
    * 
    */
}
