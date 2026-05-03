import {
    IGetAllProductsRequest,
    IProductResponse,
    IGetProductRequest,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";

export interface IProductClientService {
    getAllAsync(dto: IGetAllProductsRequest): Promise<IProductResponse[]>;

    getAsync(dto: IGetProductRequest): Promise<IProductResponse>;
}
