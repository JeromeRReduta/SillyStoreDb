import { IOrderRepository } from "../../domain/repos/IOrderRepository.ts";
import HttpError from "../../errors/HttpError.ts";
import { IAddOrderToProductRequest } from "../dtos/requests/IAddProductToOrderRequest.ts";
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
        throw new Error("Method not implemented.");
    }

    async getAllOwnedAsync(
        dto: IGetAllOrdersRequest,
    ): Promise<IOrderResponse[]> {
        const isAdmin: boolean = dto.userId === null;
        const isSignedIn: boolean =
            dto.userId !== undefined && dto.userId !== null; // need to check this way *just* in case userId = 0
        if (isAdmin) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "Wait a minute; you're supposed to be on the admin service (PENDING). How'd you get here?",
            );
        }
        if (!isSignedIn) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "You must be signed in to access this resource!",
            );
        }
        return await this.repo.getAllAsync(dto);
    }

    async getAsync(dto: IGetOrderRequest): Promise<IOrderResponse | null> {
        throw new Error("Method not implemented.");
    }
    async addProductToOrderAsync(
        dto: IAddOrderToProductRequest,
    ): Promise<IOrderProductResponse> {
        throw new Error("Method not implemented.");
    }
    async getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]> {
        throw new Error("Method not implemented.");
    }

    // async getOrdersIncludingProduct(
    //     dto: IGetOrdersIncludingProductRequest,
    // ): Promise<IOrderResponse[]> {
    //     const isAdmin: boolean = dto.userId === null;
    //     if (isAdmin) {
    //         throw new HttpError(
    //             HttpStatus.FORBIDDEN,
    //             "Wait a minute; you're supposed to be on the admin service (PENDING). How'd you get here?",
    //         );
    //     }
    //     if (dto.userId === undefined) {
    //         throw new HttpError(
    //             HttpStatus.UNAUTHORIZED,
    //             "You must be signed in to access this resource!",
    //         );
    //     }
    //     return await this.repo.getOrdersIncludingProduct(dto);
    // }
}
