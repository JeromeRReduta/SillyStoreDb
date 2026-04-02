// import { QueryConfig, type Client } from "pg";
// import { type token } from "../../../../SillyStoreCommon/domain-objects/Token.ts";
// import type UserRepository from "../../../domain/repositories/UserRepository.ts";
// import type {
//     createUserAsyncInfo,
//     getUserAsyncInfo,
// } from "../../../domain/repositories/UserRepository.ts";
import bcrypt from "bcrypt";
// import pgToDomainMapper from "../dtos/mapping/PgDtoMapper.ts";

import { type QueryConfig, type Client } from "pg";
import { type PgDtoMapper } from "../dtos/mapping/PgDtoMapper.ts";
import { type PgUser } from "../entities/PgUser.ts";
import { type TokenResponse } from "../dtos/responses/TokenResponse.ts";
import type UserRepository from "../../../domain/repositories/UserRepository.ts";
import {
    type createUserAsyncInfo,
    type getUserAsyncInfo,
} from "../../../domain/repositories/UserRepository.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

export default class PgUserRepository implements UserRepository {
    private static readonly numSaltRounds: number = 10;
    private readonly db: Client;
    private readonly dbName: string;
    private readonly userToTokenMapper: PgDtoMapper<PgUser, TokenResponse>;

    constructor({
        db,
        dbName,
        userToTokenMapper,
    }: {
        db: Client;
        dbName: string;
        userToTokenMapper: PgDtoMapper<PgUser, TokenResponse>;
    }) {
        this.db = db;
        this.dbName = dbName;
        this.userToTokenMapper = userToTokenMapper;
    }

    async getByInfoAsync({
        username,
        pw,
    }: getUserAsyncInfo): Promise<TokenResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM ${this.dbName}
                WHERE username = $1
            `,
            values: [username],
        };
        const pgUser: PgUser = (await this.db.query(sql)).rows[0];
        if (!pgUser) {
            return null;
        }
        const arePwsMatching: boolean = await bcrypt.compare(
            pw,
            pgUser.pw_hash,
        );
        if (!arePwsMatching) {
            logger.debug("No match!");
            return null;
        }
        logger.debug("Found match!");
        return this.userToTokenMapper.apply(pgUser);
    }

    async createAsync({
        username,
        pw,
        email,
    }: createUserAsyncInfo): Promise<TokenResponse | null> {
        const pwHash: string = await bcrypt.hash(
            pw,
            PgUserRepository.numSaltRounds,
        );
        const sql: QueryConfig = {
            text: `
            INSERT INTO ${this.dbName} (username, pw_hash, email)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            values: [username, pwHash, email],
        };
        const {
            rows: [result],
        } = await this.db.query(sql);
        return result ? this.userToTokenMapper.apply(result) : null;
    }
}
