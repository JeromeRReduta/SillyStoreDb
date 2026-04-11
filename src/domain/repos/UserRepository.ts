/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICreateUserRequest } from "../../application/dtos/requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../application/dtos/requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../application/dtos/requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../application/dtos/requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../application/dtos/requests/IGetUserRequest.ts";
import { IUserResponse } from "../../application/dtos/responses/IUserResponse.ts";
import { IUserDao } from "../../infrastructure/psql/data_access/IUserDao.ts";
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
    async deleteAsync(_dto: IDeleteUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }
    async getByCredentialsAsync(
        dto: IGetUserByCredentialsRequest,
    ): Promise<IUserResponse | null> {
        return await this.dao.getByCredentialsAsync(dto);
    }
}
