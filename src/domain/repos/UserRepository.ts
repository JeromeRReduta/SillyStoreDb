/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICreateUserRequest } from "../../../SillyStoreCommon/dtos/requests/create-requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../../SillyStoreCommon/dtos/requests/delete-requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../../SillyStoreCommon/dtos/requests/get-requests/IGetUserRequest.ts";
import { IUpdateUserRequest } from "../../../SillyStoreCommon/dtos/requests/update-requests/IUpdateUserRequest.ts";
import { IUserResponse } from "../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IUserDao } from "../../infrastructure/data_access/IUserDao.ts";
import { IUserRepository } from "./IUserRepository.ts";

export default class UserRepository implements IUserRepository {
    private dao: IUserDao;

    constructor(dao: IUserDao) {
        this.dao = dao;
    }

    async createAsync(dto: ICreateUserRequest): Promise<IUserResponse> {
        return await this.dao.createAsync(dto);
    }

    async getAllAsync(_dto: IGetAllUsersRequest): Promise<IUserResponse[]> {
        throw new Error("Method not implemented.");
    }

    async getAsync(_dto: IGetUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }

    async updateAsync(_dto: IUpdateUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }

    async deleteAsync(_dto: IDeleteUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }

    async getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null> {
        return await this.dao.getByCredentialsAsync(dto);
    }
}
