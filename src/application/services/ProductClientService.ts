import {
    IGetAllProductsRequest,
    IProductResponse,
    IGetProductRequest,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
import HttpError from "../../errors/HttpError.ts";
import { IProductDao } from "../../infrastructure/data_access/IProductDao.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IProductClientService } from "./IProductClientService.ts";

export default class ProductClientService implements IProductClientService {
    private productDao: IProductDao;

    constructor(productDao: IProductDao) {
        this.productDao = productDao;
    }

    async getAllAsync(
        dto: IGetAllProductsRequest,
    ): Promise<IProductResponse[]> {
        return await this.productDao.getAllAsync(dto);
    }

    async getAsync(dto: IGetProductRequest): Promise<IProductResponse> {
        const product: IProductResponse | null =
            await this.productDao.getAsync(dto);
        if (!product) {
            throw new HttpError(HttpStatus.NOT_FOUND, "No matching product!");
        }
        return product;
    }
}
