import { NextFunction, Request, Response } from "express";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

export default async function tryGetAllProductsAsync(
    _req: Request<object, IProductResponse[], object>,
    res: Response<IProductResponse[]>,
    next: NextFunction,
) {
    try {
        const { clientProductService } = apiConfigs.services;
        const products: IProductResponse[] =
            await clientProductService.getAllAsync({});
        res.status(HttpStatus.OK).send(products);
    } catch (e) {
        next(e);
    }
}
