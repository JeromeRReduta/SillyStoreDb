import { NextFunction, Request, Response } from "express";

export type Handler<TRequestParams, TRequestBody, TResponseBody> = (
    req: Request<TRequestParams, TResponseBody, TRequestBody>,
    res: Response<TResponseBody>,
    next: NextFunction,
) => void | Promise<void>;
