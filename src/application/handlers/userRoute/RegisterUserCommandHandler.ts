import { Request, Response, NextFunction } from "express";
import { UserResponse } from "../../dtos/users/UserResponse.ts";
import { RouteCommandQueryHandler } from "../RouteCommandQueryHandler.ts";
import { CreateUserRequest } from "../../dtos/users/CreateUserRequest.ts";
import HttpStatus from "../../StatusCodes.ts";
import { TokenResponse } from "../../dtos/users/TokenResponse.ts";
import { UserRepository } from "../../../domain/repos/UserRepository.ts";
import tokenOps from "../../../infrastructure/jwt/tokenOps.ts";
import requireBody from "../../validation/requireBody.ts";

export default class RegisterUserCommandHandler implements RouteCommandQueryHandler<
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
            requireBody(["username", "email", "password"])(
                req,
                res,
                setUserIdAndTokenAsync,
            );
            await this.setUserIdAndTokenAsync(req);
            res.status(HttpStatus.CREATED).send(req.session.token);
            // validate req body: "username", "email", "pw"
            // const user: UserResponse = await repo.createUser(req.body)
            // set req.userId to user.id
            // set req.session.token to tokenOps.create({user.id})
            // res.status(Http.CREATED).send(req.session.token)
        } catch (e) {
            next(e);
        }
    }

    async setUserIdAndTokenAsync(
        req: Request<object, TokenResponse, CreateUserRequest>,
        _res: Response<TokenResponse>,
        _next: NextFunction,
    ): Promise<void> {
        const user: UserResponse = await this.repo.createAsync(req.body);
        req.userId = user.id;
        req.session.token = tokenOps.create({ id: user.id });
    }
}
