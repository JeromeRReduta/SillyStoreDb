import type { GenericRepository } from "./GenericRepository.ts";
import type { GetAllUsersRequest } from "../../application/dtos/users/GetAllUsersRequest.ts";
import type { DeleteUserRequest } from "../../application/dtos/users/DeleteUserRequest.ts";
import type { UserResponse } from "../../application/dtos/users/UserResponse.ts";

export interface UserRepository extends GenericRepository<
    GetAllUsersRequest,
    GetAllUsersRequest,
    DeleteUserRequest,
    UserResponse
> {
    getByCredentials(
        requestDto: getUserByCredentialsRequest,
    ): Promise<UserResponse>;
}
