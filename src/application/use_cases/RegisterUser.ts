import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { UserRepository } from "../../domain/repos/UserRepository.ts";
import { CreateUserRequest } from "../dtos/requests/CreateUserRequest.ts";
import { UserResponse } from "../dtos/responses/UserResponse.ts";
import { UseCase } from "./UseCase.ts";
import requireBody from "../middleware/RequireBody.ts";
import tokenOps from "../jwt/TokenOperations.ts";
import HttpStatus from "../http/HttpStatus.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export default class RegisterUser implements UseCase<
    CreateUserRequest,
    { token: string }
> {
    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    async callAsync(
        createUserRequest: CreateUserRequest,
    ): Promise<{ token: string }> {
        const user: UserResponse =
            await this.repo.createAsync(createUserRequest);
        const token: string = tokenOps.create({ id: user.id });
        return { token };
    }
}
