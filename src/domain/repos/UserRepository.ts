import { GenericRepository } from "./GenericRepository.ts";

export interface UserRepository extends GenericRepository<
    GetAllUserRequests,
    GetUserRequest,
    DeleteUserRequest,
    UserResponse
> {}
