import logger from "../../../SillyStoreCommon/logging/Logger.ts";
import { IProductRepository } from "../../domain/repos/IProductRepository.ts";
import HttpError from "../../errors/HttpError.ts";
import { IGetAllProductsRequest } from "../dtos/requests/IGetAllProductsRequest.ts";
import { IGetOrdersIncludingProductRequest } from "../dtos/requests/IGetOrdersIncludingProductRequest.ts";
import { IGetProductRequest } from "../dtos/requests/IGetProductRequest.ts";
import { IOrderResponse } from "../dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IClientProductService } from "./IClientProductService.ts";

export default class ClientProductService implements IClientProductService {
    private repo: IProductRepository;

    constructor(repo: IProductRepository) {
        this.repo = repo;
    }

    async getAllAsync(
        dto: IGetAllProductsRequest,
    ): Promise<IProductResponse[]> {
        return await this.repo.getAllAsync(dto);
    }

    async getAsync(dto: IGetProductRequest): Promise<IProductResponse> {
        const found: IProductResponse | null = await this.repo.getAsync(dto);
        if (!found) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No matching product found!",
            );
        }
        return found;
    }

    async getOrdersIncludingProduct(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]> {
        const isAdmin: boolean = dto.userId === null;
        if (isAdmin) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Attempting to access client service w/o token. If you're an admin, use the admin service (PENDING). If you're not, sign in.",
            );
        }
        return await this.repo.getOrdersIncludingProduct(dto);
    }
}
