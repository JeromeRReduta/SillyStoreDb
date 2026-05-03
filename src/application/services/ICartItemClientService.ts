import {
    ICartItemResponse,
    IGetPendingCartItemsRequest,
    IMergeCartItemsInOrderRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";

export interface ICartItemClientService {
    /**
     * Gets cart items in pending order
     * @throws {HttpError} 404 if no pending order exists
     * @param dto
     * @returns {Promise<ICartItemResponse[]>}
     */
    getPendingCartItemsAsync(
        dto: IGetPendingCartItemsRequest,
    ): Promise<ICartItemResponse[]>;

    /**
     * Overwrites pending cart w/ payload from request
     * @param dto
     * @note if no pending order exists, this method will MAKE A NEW ONE
     */
    overwritePendingCart(dto: IMergeCartItemsInOrderRequest): Promise<void>;
}
