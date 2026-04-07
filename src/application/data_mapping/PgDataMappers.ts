import { PgUser } from "../../infrastructure/psql/entities/PgUser.ts";
import { IUserResponse } from "../dtos/responses/IUserResponse.ts";
import { IDataMapper } from "./DataMapper.ts";

const userMapper: IDataMapper<PgUser, IUserResponse> = ({
    id,
    username,
    email,
}: PgUser) => {
    return { id, username, email };
};

const pgDataMappers = {
    userMapper,
};

export default pgDataMappers;
