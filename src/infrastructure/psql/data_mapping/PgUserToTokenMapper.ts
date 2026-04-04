import { TokenResponse } from "../../../application/shared/responses/TokenResponse.ts";
import tokenOps from "../../jwt/tokenOps.ts";
import { PgUser } from "../db_entities/PgUser.ts";
import { DataMapper } from "./DataMapper.ts";

const userToTokenResponseMapper: DataMapper<PgUser, TokenResponse> = {
    apply({ id }: PgUser): TokenResponse {
        return tokenOps.create({ id });
    },
};

export default userToTokenResponseMapper;
