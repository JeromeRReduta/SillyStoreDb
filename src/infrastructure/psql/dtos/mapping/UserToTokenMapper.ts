import { type PgUser } from "../../entities/PgUser.ts";
import { type TokenResponse } from "../responses/TokenResponse.ts";
import { type PgDtoMapper } from "./PgDtoMapper.ts";

const userToTokenMapper: PgDtoMapper<PgUser, TokenResponse> = {
    apply({ id }: PgUser): TokenResponse {
        return "TODO"; // TODO: add jwt funcs
    },
};

export default userToTokenMapper;
