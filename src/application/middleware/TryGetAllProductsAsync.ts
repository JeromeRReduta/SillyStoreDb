import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";

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
