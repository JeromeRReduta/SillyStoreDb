import { NextFunction, Request, Response } from "express";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import { IGetProductRequest } from "../dtos/requests/IGetProductRequest.ts";
import apiConfigs from "../../configs/ApiConfigs.ts";

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
