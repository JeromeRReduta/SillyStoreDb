import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../http/HttpStatus.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";
import { IGetProductRequest } from "../../../SillyStoreCommon/dtos/requests/IGetProductRequest.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";

export default async function tryGetProductAsync(
    req: Request<IGetProductRequest, IProductResponse, object>,
    res: Response<IProductResponse>,
    next: NextFunction,
) {
    try {
        const { clientProductService } = apiConfigs.services;

        const found: IProductResponse = await clientProductService.getAsync(
            req.params,
        );
        res.status(HttpStatus.OK).send(found);
    } catch (e) {
        next(e);
    }
}
