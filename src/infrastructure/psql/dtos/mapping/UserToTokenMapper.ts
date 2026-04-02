import tokenOps from "../../../jwt/tokenOps.ts";
import { type PgUser } from "../../entities/PgUser.ts";
import { type TokenResponse } from "../responses/TokenResponse.ts";
import { type PgDtoMapper } from "./PgDtoMapper.ts";

const userToTokenMapper: PgDtoMapper<PgUser, TokenResponse> = {
    apply(user: PgUser): TokenResponse {
        return tokenOps.create(user);
    },
};

export default userToTokenMapper;
