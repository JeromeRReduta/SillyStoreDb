import { ICreateUserRequest } from "../../application/dtos/requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../application/dtos/requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../application/dtos/requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../application/dtos/requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../application/dtos/requests/IGetUserRequest.ts";
import { IUserResponse } from "../../application/dtos/responses/IUserResponse.ts";
import { IGenericRepository } from "./ICrudRepository.ts";

export interface IUserRepository extends IGenericRepository<
    ICreateUserRequest,
    IGetAllUsersRequest,
    IGetUserRequest,
    IDeleteUserRequest,
    IUserResponse
> {
    getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null>;
}
