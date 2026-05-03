import {
    ICartItemResponse,
    IGetPendingCartItemsRequest,
    IMergePendingCartItemsRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";

export interface ICartItemClientService {
    /**
     * Gets cart items in pending order.
     * @param dto
     * @note Pre-condition: order exists
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
    overwritePendingCart(dto: IMergePendingCartItemsRequest): Promise<void>;
}
