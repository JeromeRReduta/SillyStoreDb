import {
    ICreateUserRequest,
    TokenResponse,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";

export interface IUserClientService {
    registerAsync(dto: ICreateUserRequest): Promise<TokenResponse>;

    loginAsync(dto: IGetUserByCredentialsRequest): Promise<TokenResponse>;
}
