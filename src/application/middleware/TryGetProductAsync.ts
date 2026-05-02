import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import {
    IGetProductRequest,
    IProductResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";

export default async function tryGetProductAsync(
    req: ExpressRequest<IGetProductRequest, IProductResponse, object>,
    res: ExpressResponse<IProductResponse>,
    next: NextFunction,
) {
    try {
        const { productClientService: service } = apiConfigs.services;
        const { id } = req.params;
        const dto: IGetProductRequest = { id };
        const found: IProductResponse = await service.getAsync(dto);
        res.status(HttpStatus.OK).send(found);
    } catch (e) {
        next(e);
    }
}
