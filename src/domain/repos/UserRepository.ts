import { UserResponse } from "../../application/dtos/responses/UserResponse.ts";
import { Repository } from "./Repository.ts";

export interface UserRepository<TDbEntity> extends Repository<
    TDbEntity,
    UserResponse,
    CreateUserRequest,
    GetAllUsersRequest,
    GetUserRequest,
    DeleteUserRequest
> {
    // getUserByCredentialsAsync(request: getUserByCredentialsRequest): Promise<UserResponse>
}

// export interface Repository<
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     _TDbEntity,
//     TResponse,
//     TCreateRequest,
//     TGetAllRequest,
//     TGetRequest,
//     TDeleteRequest,
// >
