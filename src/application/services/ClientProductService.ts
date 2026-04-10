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

    async getOrdersIncludingProductAsync(
        dto: IGetOrdersIncludingProductRequest,
    ): Promise<IOrderResponse[]> {
        const isAdmin: boolean = dto.userId === null;
        if (isAdmin) {
            throw new HttpError(
                HttpStatus.FORBIDDEN,
                "Wait a minute; you're supposed to be on the admin service (PENDING). How'd you get here?",
            );
        }
        if (dto.userId === undefined) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "You must be signed in to access this resource!",
            );
        }
        return await this.repo.getOrdersIncludingProduct(dto);
    }
}
