import { UserResponse } from "../../../application/dtos/users/UserResponse.ts";
import { PgUser } from "../db_entities/PgUser.ts";
import { DataMapper } from "./DataMapper.ts";

const userMapper: DataMapper<PgUser, UserResponse> = {
    apply({ id, username, email }: PgUser): UserResponse {
        return { id, username, email };
    },
};

export default userMapper;
