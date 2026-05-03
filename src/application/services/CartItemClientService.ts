import {
    IGetPendingCartItemsRequest,
    ICartItemResponse,
    IMergePendingCartItemsRequest,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import { ICartItemDao } from "../../infrastructure/data_access/ICartItemDao.ts";
import { ICartItemClientService } from "./ICartItemClientService.ts";

export default class CartItemClientService implements ICartItemClientService {
    private cartItemDao: ICartItemDao;

    constructor(cartItemDao: ICartItemDao) {
        this.cartItemDao = cartItemDao;
    }

    async getPendingCartItemsAsync(
        dto: IGetPendingCartItemsRequest,
    ): Promise<ICartItemResponse[]> {
        return await this.cartItemDao.getAllPendingAsync(dto);
    }

    async overwritePendingCart(
        dto: IMergePendingCartItemsRequest,
    ): Promise<void> {
        await this.cartItemDao.mergePendingCartAsync(dto);
    }
}
