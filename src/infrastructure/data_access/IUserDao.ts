import {
    ICreateUserRequest,
    IGetAllUsersRequest,
    IGetUserRequest,
    IUpdateUserRequest,
    IDeleteUserRequest,
    IUserResponse,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";
import { ICrudDao } from "./ICrudDao.ts";

export interface IUserDao extends ICrudDao<
    ICreateUserRequest,
    IGetAllUsersRequest,
    IGetUserRequest,
    IUpdateUserRequest,
    IDeleteUserRequest,
    IUserResponse
> {
    getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null>;
}
