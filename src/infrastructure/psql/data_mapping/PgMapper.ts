import { DataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { UserResponse } from "../../../application/dtos/users/UserResponse.ts";
import { PgUser } from "../entities/PgUser.ts";

export const toUser: DataMapper<PgUser, UserResponse> = {
    apply({ id, username, email }: PgUser): UserResponse {
        return { id, username, email };
    },
};
