import { CreateUserRequest } from "../../application/dtos/requests/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../application/dtos/requests/DeleteUserRequest.ts";
import { GetAllUsersRequest } from "../../application/dtos/requests/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../application/dtos/requests/GetUserRequest.ts";
import { UserResponse } from "../../application/dtos/responses/UserResponse.ts";
import { UserDao } from "../../infrastructure/data_access/UserDao.ts";
import { Repository } from "./Repository.ts";

export default class SimpleUserRepository<TDbEntity> implements Repository<
    TDbEntity,
    UserResponse,
    CreateUserRequest,
    GetAllUsersRequest,
    GetUserRequest,
    DeleteUserRequest
> {
    private dao: UserDao<TDbEntity>;

    constructor(dao: UserDao<TDbEntity>) {
        this.dao = dao;
    }

    async createAsync(request: CreateUserRequest): Promise<UserResponse> {
        return await this.dao.createAsync(request);
    }
    async getAllAsync(request: GetAllUsersRequest): Promise<UserResponse> {
        return await this.dao.getAllAsync(request);
    }
    async getAsync(request: GetUserRequest): Promise<UserResponse> {
        return await this.dao.getAsync(request);
    }
    async deleteAsync(request: DeleteUserRequest): Promise<UserResponse> {
        return await this.dao.deleteAsync(request);
    }
}
