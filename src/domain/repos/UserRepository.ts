/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICreateUserRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserRequest.ts";
import { IUpdateUserRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateUserRequest.ts";
import { IUserResponse } from "../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IUserDao } from "../../infrastructure/data_access/IUserDao.ts";
import CrudRepositories from "./CrudRepositories.ts";
import { IUserRepository } from "./IUserRepository.ts";

export default class UserRepository implements IUserRepository {
    private dao: IUserDao;

    constructor(dao: IUserDao) {
        this.dao = dao;
    }

    async createAsync(dto: ICreateUserRequest): Promise<IUserResponse> {
        return CrudRepositories.createAsync({ dao: this.dao, dto });
    }

    async getAllAsync(dto: IGetAllUsersRequest): Promise<IUserResponse[]> {
        return CrudRepositories.getAllAsync({ dao: this.dao, dto });
    }

    async getAsync(dto: IGetUserRequest): Promise<IUserResponse | null> {
        return CrudRepositories.getAsync({ dao: this.dao, dto });
    }

    async updateAsync(dto: IUpdateUserRequest): Promise<IUserResponse | null> {
        return CrudRepositories.updateAsync({ dao: this.dao, dto });
    }

    async deleteAsync(dto: IDeleteUserRequest): Promise<IUserResponse | null> {
        return CrudRepositories.deleteAsync({ dao: this.dao, dto });
    }

    async getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null> {
        return await this.dao.getByCredentialsAsync(dto);
    }
}
