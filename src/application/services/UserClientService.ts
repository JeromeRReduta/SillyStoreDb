import {
    ICreateUserRequest,
    TokenResponse,
    IGetUserByCredentialsRequest,
    IUserResponse,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";
import HttpError from "../../errors/HttpError.ts";
import { IUserDao } from "../../infrastructure/data_access/IUserDao.ts";
import { HttpStatus } from "../http/HttpStatus.ts";
import tokenOps from "../jwt/TokenOperations.ts";
import { IUserClientService } from "./IUserClientService.ts";

export default class UserClientService implements IUserClientService {
    private userDao: IUserDao;

    constructor(userDao: IUserDao) {
        this.userDao = userDao;
    }

    async registerAsync(dto: ICreateUserRequest): Promise<TokenResponse> {
        const user: IUserResponse = await this.userDao.createAsync(dto);
        return tokenOps.create({
            id: user.id,
            role: user.role,
        });
    }

    async loginAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<TokenResponse> {
        const user: IUserResponse | null =
            await this.userDao.getByCredentialsAsync(dto);
        if (!user) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No matching user found!",
            );
        }
        return tokenOps.create({
            id: user.id,
            role: user.role,
        });
    }

    // async loginAsync(
    //     dto: IGetUserByCredentialsRequest,
    // ): Promise<TokenResponse> {
    //     const user: IUserResponse | null =
    //         await this.repo.getByCredentialsAsync(dto);
    //     if (!user) {
    //         throw new HttpError(
    //             HttpStatus.NOT_FOUND,
    //             "No matching user found!",
    //         );
    //     }
    //     const token: TokenResponse = tokenOps.create({ id: user.id });
    //     return token;
    // }
}
