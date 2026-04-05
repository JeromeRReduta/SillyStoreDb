import type { NextFunction, Request, Response } from "express";

/**
 * Generic interface for any command/query handler
 * @type {TRequestParams} what request params should have
 * @type {TRequestBody} what request body should have
 * @type {TResponseBody} what response body should have
 */
export interface RouteCommandQueryHandler<
    TRequestParams extends object,
    TRequestBody extends object,
    TResponseBody,
> {
    handleAsync(
        req: Request<TRequestParams, TResponseBody, TRequestBody>,
        res: Response<TResponseBody>,
        next: NextFunction,
    ): Promise<void>;
}
