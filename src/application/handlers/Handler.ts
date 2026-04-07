import { NextFunction, Request, Response } from "express";

export type Handler<TRequestParams, TRequestBody, TResponseBody> = (
    req: Request<TRequestParams, TResponseBody, TRequestBody>,
    res: Response<TResponseBody>,
    next: NextFunction,
) => void | Promise<void>;

export interface UseCase<TRequestParams, TRequestBody, TResponseBody> {
    getHandlers(): Handler<TRequestParams, TRequestBody, TResponseBody>[];
}
