import type { Client, Pool, QueryConfig } from "pg";
import { CreateUserRequest } from "../../../application/dtos/users/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../../application/dtos/users/DeleteUserRequest.ts";
import { GetUserByCredentialsRequest } from "../../../application/dtos/users/GetUserByCredentialsRequest.ts";
import { UserResponse } from "../../../application/dtos/users/UserResponse.ts";
import { UserRepository } from "../../../domain/repos/UserRepository.ts";
import { DataMapper } from "../data_mapping/DataMapper.ts";
import { PgUser } from "../db_entities/PgUser.ts";
import { GetAllUsersRequest } from "../../../application/dtos/users/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../../application/dtos/users/GetUserRequest.ts";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";
import bcrypt from "bcrypt";

export default class PgUserRepository implements UserRepository {
    private db: Client | Pool;
    private userMapper: DataMapper<PgUser, UserResponse>;
    static readonly NUM_SALT_ROUNDS = 10;
    constructor(
        db: Client | Pool,
        userMapper: DataMapper<PgUser, UserResponse>,
    ) {
        this.db = db;
        this.userMapper = userMapper;
    }

    async getByCredentialsAsync({
        username,
        pw,
    }: GetUserByCredentialsRequest): Promise<UserResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM users
                WHERE username = $1
            `,
            values: [username],
        };
        logger.debug("Running sql", sql);
        const users: PgUser[] = (await this.db.query(sql)).rows;
        for (const user of users) {
            const hasMatchingPassword: boolean = await bcrypt.compare(
                pw,
                user.pw_hash,
            );
            if (hasMatchingPassword) {
                logger.debug("Found matching user!");
                return this.userMapper.apply(user);
            }
        }
        logger.debug("Could not find matching user");
        return null;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllAsync(_dto: GetAllUsersRequest): Promise<UserResponse[]> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM users
            `,
        };
        logger.debug("Running sql", sql);
        const users: PgUser[] = (await this.db.query(sql)).rows;
        logger.debug("Result", users);
        return users.map(this.userMapper.apply);
    }

    async getAsync({ id }: GetUserRequest): Promise<UserResponse | null> {
        const sql: QueryConfig = {
            text: `
            SELECT * FROM users
            WHERE id = $1
            `,
            values: [id],
        };
        logger.debug("Running sql", sql);
        const found: PgUser | undefined = (await this.db.query(sql)).rows[0];
        logger.debug("Result", found);
        return found ? this.userMapper.apply(found) : null;
    }

    async createAsync({
        username,
        pw,
        email,
    }: CreateUserRequest): Promise<UserResponse> {
        const pwHash: string = await bcrypt.hash(
            pw,
            PgUserRepository.NUM_SALT_ROUNDS,
        );
        const sql: QueryConfig = {
            text: `
                INSERT INTO users (username, pw_hash, email)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            values: [username, pwHash, email],
        };
        logger.debug("Running sql", sql);
        const created: PgUser = (await this.db.query(sql)).rows[0];
        logger.debug("Created:", created);
        return this.userMapper.apply(created);
    }
    async deleteAsync({ id }: DeleteUserRequest): Promise<UserResponse | null> {
        const sql: QueryConfig = {
            text: `
                DELETE FROM users
                WHERE id = $1
                RETURNING *
            `,
            values: [id],
        };
        logger.debug("Running sql", sql);
        const deleted: PgUser | undefined = (await this.db.query(sql)).rows[0];
        logger.debug("Deleted:", deleted);
        return deleted ? this.userMapper.apply(deleted) : null;
    }
}
