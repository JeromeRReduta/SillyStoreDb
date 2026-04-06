import { CreateUserRequest } from "../../application/dtos/requests/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../application/dtos/requests/DeleteUserRequest.ts";
import { GetAllUsersRequest } from "../../application/dtos/requests/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../application/dtos/requests/GetUserRequest.ts";
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
