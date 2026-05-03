import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from "express";
import {
    IGetAllProductsRequest,
    IProductResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import HttpStatus from "../http/HttpStatus.ts";

export default async function tryGetAllProductsAsync(
    _req: ExpressRequest<object, IProductResponse[], object>,
    res: ExpressResponse<IProductResponse[]>,
    next: NextFunction,
) {
    try {
        const { productClientService: service } = apiConfigs.services;
        const dto: IGetAllProductsRequest = {};
        const products: IProductResponse[] = await service.getAllAsync(dto);
        res.status(HttpStatus.OK).send(products);
    } catch (e) {
        next(e);
    }
}
