import { ICreateUserRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserRequest.ts";
import { IUserResponse } from "../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IGenericDao } from "./IGenericDao.ts";

export interface IUserDao extends IGenericDao<
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
