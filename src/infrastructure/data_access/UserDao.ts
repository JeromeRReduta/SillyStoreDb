// /**
//  * Data access object
//  * @type {_TDbEntity} Specified for data mapping
//  * @type {TResponse}
//  * @type {TCreateRequest}
//  * @type {TGetAllRequest}
//  * @type {TGetRequest}
//  * @type {TDeleteRequest}
//  */
// export interface Dao<
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     _TDbEntity,
//     TResponse,
//     TCreateRequest,
//     TGetAllRequest,
//     TGetRequest,
//     TDeleteRequest,
// > {
//     createAsync(request: TCreateRequest): Promise<TResponse>;
//     getAllAsync(request: TGetAllRequest): Promise<TResponse>;
//     getAsync(request: TGetRequest): Promise<TResponse>;
//     deleteAsync(request: TDeleteRequest): Promise<TResponse>;
// }

import { CreateUserRequest } from "../../application/dtos/requests/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../application/dtos/requests/DeleteUserRequest.ts";
import { GetAllUsersRequest } from "../../application/dtos/requests/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../application/dtos/requests/GetUserRequest.ts";
import { UserResponse } from "../../application/dtos/responses/UserResponse.ts";
import { Dao } from "./Dao.ts";

export type UserDao<TDbEntity> = Dao<
    TDbEntity,
    UserResponse,
    CreateUserRequest,
    GetAllUsersRequest,
    GetUserRequest,
    DeleteUserRequest
>;
