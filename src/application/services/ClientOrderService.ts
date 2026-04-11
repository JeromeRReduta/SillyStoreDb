import { IOrderRepository } from "../../domain/repos/IOrderRepository.ts";
import HttpError from "../../errors/HttpError.ts";
import { IAddProductToOrderRequest } from "../dtos/requests/IAddProductToOrderRequest.ts";
import { ICreateOrderRequest } from "../dtos/requests/ICreateOrderRequest.ts";
import { IGetAllOrdersRequest } from "../dtos/requests/IGetAllOrdersRequest.ts";
import { IGetOrderRequest } from "../dtos/requests/IGetOrderRequest.ts";
import { IGetProductsInOrderRequest } from "../dtos/requests/IGetProductsInOrder.ts";
import { IOrderProductResponse } from "../dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
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
        throw new Error("Method not implemented.");
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
        if (order.id !== userId) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "You do not own this order!",
            );
        }
        return await this.repo.getProductsInOrderAsync(dto);
    }
}
