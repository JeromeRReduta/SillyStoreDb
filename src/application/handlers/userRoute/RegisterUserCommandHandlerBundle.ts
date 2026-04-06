import { Request, Response, NextFunction } from "express";
import { UserResponse } from "../../dtos/users/UserResponse.ts";
import {
    RouteCommandQueryHandler,
    RouteCommandQueryHandlerBundle,
} from "../RouteCommandQueryHandlerBundle.ts";
import { CreateUserRequest } from "../../dtos/users/CreateUserRequest.ts";
import HttpStatus from "../../StatusCodes.ts";
import { TokenResponse } from "../../dtos/users/TokenResponse.ts";
import { UserRepository } from "../../../domain/repos/UserRepository.ts";
import tokenOps from "../../../infrastructure/jwt/tokenOps.ts";
import requireBody from "../../validation/requireBody.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

const RegisterUserCommandHandlerBundle: RouteCommandQueryHandlerBundle<
    object,
    CreateUserRequest,
    TokenResponse
> = {
    handlers: [
        requireBody(["username", "email", "pw"]),
        setUpUserIdAndTokenAsync,
        (
            req: Request<object, TokenResponse, CreateUserRequest>,
            res: Response<TokenResponse>,
            _next: NextFunction,
        ) => {
            res.status(HttpStatus.CREATED).send(req.session.token);
        },
    ],
};

export default class RegisterUserCommandHandlers implements RouteCommandQueryHandler<
    object,
    CreateUserRequest,
    TokenResponse
> {
    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    async handleAsync(
        req: Request<object, TokenResponse, CreateUserRequest>,
        res: Response<TokenResponse>,
        next: NextFunction,
    ): Promise<void> {
        try {
            requireBody(["username", "email", "pw"])(req, res);
            await this.setUserIdAndTokenAsync(req);
            res.status(HttpStatus.CREATED).send(req.session.token);
        } catch (e) {
            // logger.error("code", e.code);
            // logger.error("type of code", typeof e.code);
            next(e);
        }
    }

    async setUserIdAndTokenAsync(
        req: Request<object, TokenResponse, CreateUserRequest>,
    ): Promise<void> {
        const user: UserResponse = await this.repo.createAsync(req.body);
        req.userId = user.id;
        if (!req.session) {
            req.session = {};
        }
        req.session.token = tokenOps.create({ id: user.id });
    }
}
