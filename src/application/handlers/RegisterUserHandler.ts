import { NextFunction, Request } from "express";
import { UserRepository } from "../../domain/repos/UserRepository.ts";
import { CreateUserRequest } from "../dtos/requests/CreateUserRequest.ts";
import { UserResponse } from "../dtos/responses/UserResponse.ts";
import { Handler, UseCase } from "./Handler.ts";

const registerUseCase: Handler<object, CreateUserRequest, UserResponse> = [
    requireBody(["username", "email", "pw"]),
    registerUserAndSetTokenAsync,
    (
        req: Request<object, CreateUserRequest, UserResponse>,
        res: Response<UserResponse>,
        next: NextFunction,
    ) => {
        res.status(HttpStatus.CREATED).send(req.session.token);
    },
];

export function registerUserAndSetTokenAsync(
    req: Request<object, CreateUserRequest, UserResponse>,
    res: Response<UserResponse>,
    next: NextFunction,
) {
    const user: UserResponse = await backendConfigs.userRepo.createAsync(
        req.body,
    );
    req.session.token = tokenOps.create({ id: user.id });
}

export function sendToken();

export default class RegisterUseCase<TDbUser> implements UseCase<
    object,
    CreateUserRequest,
    UserResponse
> {
    private repo: UserRepository<TDbUser>;
    private handlers: Handler<object, CreateUserRequest, UserResponse>;

    constructor(repo: UserRepository<TDbUser>) {
        this.repo = repo;
        this.handlers = [
            requireBody(["username", "email", "pw"]),
            registerUserAsync,
        ];
    }
    getHandlers(): Handler<object, CreateUserRequest, UserResponse>[] {
        return this.handlers;
    }

    private async registerUserAsync(
        req: Request<object, UserResponse, CreateUserRequest>,
        res: Response<UserResponse>,
        _next: NextFunction,
    ) {}
}
