import { IAddProductToOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../../../SillyStoreCommon/dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/IGetAllOrdersRequest.ts";
import { IGetAllPendingOrdersRequest } from "../../../SillyStoreCommon/dtos/requests/IGetAllPendingOrdersRequest.ts";
import { IGetOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../../../SillyStoreCommon/dtos/requests/IGetProductsInOrderRequest.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IOrderRepository } from "../../domain/repos/IOrderRepository.ts";
import HttpError from "../../errors/HttpError.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IClientOrderService } from "./IClientOrderService.ts";

export default class ClientOrderService implements IClientOrderService {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository) {
        this.repo = repo;
    }

    async createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse> {
        return await this.repo.createAsync(dto);
    }

    async getAllOwnedAsync(
        dto: IGetAllOrdersRequest,
    ): Promise<IOrderResponse[]> {
        return await this.repo.getAllAsync(dto);
    }

    async getAsync(dto: IGetOrderRequest): Promise<IOrderResponse> {
        const found: IOrderResponse | null = await this.repo.getAsync(dto);
        if (!found) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No matching order found!",
            );
        }
        if (found.userId !== dto.userId) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You do not own this order!",
            );
        }
        return found;
    }

    async addProductToOrderAsync(
        dto: IAddProductToOrderRequest,
    ): Promise<IOrderProductResponse> {
        const { orderId, userId } = dto;
        const order: IOrderResponse | null = await this.repo.getAsync({
            orderId,
            userId,
        });
        if (!order) {
            throw new HttpError(HttpStatus.NOT_FOUND, "No matching order!");
        }
        if (order.userId !== userId) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You do not own this order!",
            );
        }
        return await this.repo.addProductToOrderAsync(dto);
    }

    async getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]> {
        const { orderId, userId } = dto;
        const order: IOrderResponse | null = await this.repo.getAsync({
            orderId: orderId,
            userId: userId,
        });
        if (!order) {
            throw new HttpError(HttpStatus.NOT_FOUND, "No matching order!");
        }
        if (order.userId !== userId) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You do not own this order!",
            );
        }
        return await this.repo.getProductsInOrderAsync(dto);
    }

    async getProductsInCartAsync(
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IProductResponse[] | null> {
        const cart: (IProductResponse & { quantity: number })[] =
            await this.repo.getProductsInCartAsync(dto);
        if (cart.length === 0) {
            return null;
        }
        return cart;
    }
}
