import { IUserRepository } from "../../domain/repos/IUserRepository.ts";
import { ICreateUserRequest } from "../dtos/requests/ICreateUserRequest.ts";
import { IGetUserByCredentialsRequest } from "../dtos/requests/IGetUserByCredentialsRequest.ts";
import { IUserResponse } from "../dtos/responses/IUserResponse.ts";
import { TokenResponse } from "../dtos/responses/TokenResponse.ts";
import tokenOps from "../jwt/TokenOperations.ts";
import { IClientUserService } from "./IClientUserService.ts";

export default class ClientUserService implements IClientUserService {
    private repo: IUserRepository;

    constructor(repo: IUserRepository) {
        this.repo = repo;
    }

    async registerAsync(dto: ICreateUserRequest): Promise<TokenResponse> {
        const user: IUserResponse = await this.repo.createAsync(dto);
        const token: TokenResponse = tokenOps.create({ id: user.id });
        return token;
    }

    async loginAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<TokenResponse> {
        const user: IUserResponse | null =
            await this.repo.getByCredentialsAsync(dto);
        if (!user) {
            throw new Error("TODO - http error");
        }
        const token: TokenResponse = tokenOps.create({ id: user.id });
        return token;
    }
}
