import { Client, Pool, QueryConfig } from "pg";
import { CreateUserRequest } from "../../../application/dtos/requests/CreateUserRequest.ts";
import { DeleteUserRequest } from "../../../application/dtos/requests/DeleteUserRequest.ts";
import { GetAllUsersRequest } from "../../../application/dtos/requests/GetAllUsersRequest.ts";
import { GetUserRequest } from "../../../application/dtos/requests/GetUserRequest.ts";
import { UserResponse } from "../../../application/dtos/responses/UserResponse.ts";
import { UserDao } from "../../data_access/UserDao.ts";
import { PgUser } from "../entities/PgUser.ts";
import { DataMapper } from "../../../application/data_mapping/DataMapper.ts";
import * as bcrypt from "bcrypt";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

export default class PgUserDao implements UserDao<PgUser> {
    private db: Client | Pool;
    private dataMapper: DataMapper<PgUser, UserResponse>;
    private numSaltRounds: number;

    constructor(
        db: Client | Pool,
        dataMapper: DataMapper<PgUser, UserResponse>,
        numSaltRounds: number = 10,
    ) {
        this.db = db;
        this.dataMapper = dataMapper;
        this.numSaltRounds = numSaltRounds;
    }

    async createAsync({
        username,
        pw,
        email,
    }: CreateUserRequest): Promise<UserResponse> {
        const pwHash: string = await bcrypt.hash(pw, this.numSaltRounds);
        const sql: QueryConfig = {
            text: `
                INSERT INTO users (username, pw_hash, email)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            values: [username, pwHash, email],
        };
        logger.debug("sql:", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result:", row);
        return this.dataMapper.apply(row);
    }
    async getAllAsync(request: GetAllUsersRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
    async getAsync(request: GetUserRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(request: DeleteUserRequest): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }
}
