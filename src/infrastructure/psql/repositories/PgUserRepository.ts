import { CreateUserRequest } from "../../../application/dtos/requests/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../../application/dtos/requests/DeleteUserRequest.ts";
import { GetAllUsersRequest } from "../../../application/dtos/requests/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../../application/dtos/requests/GetUserRequest.ts";
import { UserResponse } from "../../../application/dtos/responses/UserResponse.ts";
import { UserRepository } from "../../../domain/repos/UserRepository.ts";
import { PgUser } from "../entities/PgUser.ts";

export default class PgUserRepository implements UserRepository<PgUser> {
    cconst;

    async createAsync({
        username,
        pw,
        email,
    }: CreateUserRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
    async getAllAsync(request: GetAllUsersRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
    async getAsync(request: GetUserRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(request: DeleteUserRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
}
