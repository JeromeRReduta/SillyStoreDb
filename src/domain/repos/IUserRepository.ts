import { ICreateUserRequest } from "../../application/dtos/requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../application/dtos/requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../application/dtos/requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../application/dtos/requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../application/dtos/requests/IGetUserRequest.ts";
import { IUserResponse } from "../../application/dtos/responses/IUserResponse.ts";

export interface IUserRepository {
    createAsync(dto: ICreateUserRequest): Promise<IUserResponse>;
    getAllAsync(dto: IGetAllUsersRequest): Promise<IUserResponse[]>;
    getAsync(dto: IGetUserRequest): Promise<IUserResponse | null>;
    deleteAsync(dto: IDeleteUserRequest): Promise<IUserResponse | null>;
    getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null>;
}
