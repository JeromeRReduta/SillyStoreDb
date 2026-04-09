import { NextFunction, Request, Response } from "express";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import services from "../../configs/BackendConfigs.ts";
import { HttpStatus } from "../http/HttpStatus.ts";

export default async function tryGetAllProductsAsync(
    _req: Request<object, IProductResponse[], object>,
    res: Response<IProductResponse[]>,
    next: NextFunction,
) {
    try {
        const products: IProductResponse[] =
            await services.clientProductService.getAllAsync({});
        res.status(HttpStatus.OK).send(products);
    } catch (e) {
        next(e);
    }
}
