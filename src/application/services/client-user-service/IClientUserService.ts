import { ICreateUserRequest } from "../../dtos/requests/ICreateUserRequest.ts";
import { IGetUserByCredentialsRequest } from "../../dtos/requests/IGetUserByCredentialsRequest.ts";
import { TokenResponse } from "../../dtos/responses/TokenResponse.ts";

export interface IClientUserService {
    registerAsync(dto: ICreateUserRequest): Promise<TokenResponse>;
    loginAsync(dto: IGetUserByCredentialsRequest): Promise<TokenResponse>;
}
