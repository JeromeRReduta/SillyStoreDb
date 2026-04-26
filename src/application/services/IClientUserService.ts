import { ICreateUserRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateUserRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserByCredentialsRequest.ts";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/responses/TokenResponse.ts";

export interface IClientUserService {
    registerAsync(dto: ICreateUserRequest): Promise<TokenResponse>;

    loginAsync(dto: IGetUserByCredentialsRequest): Promise<TokenResponse>;
}
