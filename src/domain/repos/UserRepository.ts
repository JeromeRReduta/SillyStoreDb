import type { GenericRepository } from "./GenericRepository.ts";
import type { GetAllUsersRequest } from "../../application/dtos/users/GetAllUsersRequest.ts";
import type { DeleteUserRequest } from "../../application/dtos/users/DeleteUserRequest.ts";
import type { UserResponse } from "../../application/dtos/users/UserResponse.ts";
import type { GetUserByCredentialsRequest } from "../../application/dtos/users/GetUserByCredentialsRequest.ts";
import { CreateUserRequest } from "../../application/dtos/users/CreateUserRequest.ts";
import { GetUserRequest } from "../../application/dtos/users/GetUserRequest.ts";

export interface UserRepository extends GenericRepository<
    GetAllUsersRequest,
    GetUserRequest,
    CreateUserRequest,
    DeleteUserRequest,
    UserResponse
> {
    getByCredentialsAsync(
        dto: GetUserByCredentialsRequest,
    ): Promise<UserResponse | null>;
}
