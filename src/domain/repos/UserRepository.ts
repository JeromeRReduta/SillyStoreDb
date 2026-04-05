import type { GenericRepository } from "./GenericRepository.ts";
import type { GetAllUsersRequest } from "../../application/dtos/users/GetAllUsersRequest.ts";
import type { DeleteUserRequest } from "../../application/dtos/users/DeleteUserRequest.ts";
import type { UserResponse } from "../../application/dtos/users/UserResponse.ts";
import type { GetUserByCredentialsRequest } from "../../application/dtos/users/GetUserByCredentialsRequest.ts";

export interface UserRepository extends GenericRepository<
    GetAllUsersRequest,
    GetAllUsersRequest,
    DeleteUserRequest,
    UserResponse
> {
    getByCredentialsAsync(
        requestDto: GetUserByCredentialsRequest,
    ): Promise<UserResponse>;
}
