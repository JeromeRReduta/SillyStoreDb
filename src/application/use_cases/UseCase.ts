import { NextFunction, Request, Response } from "express";

export interface UseCase<TRequest, TResponse> {
    callAsync(request: TRequest): Promise<TResponse>;
}
