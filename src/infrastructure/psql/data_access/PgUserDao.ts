// import { Client, Pool, QueryConfig } from "pg";
// import { CreateUserRequest } from "../../../application/dtos/requests/CreateUserRequest.ts";
// import { DeleteUserRequest } from "../../../application/dtos/requests/DeleteUserRequest.ts";
// import { GetAllUsersRequest } from "../../../application/dtos/requests/GetAllUsersRequest.ts";
// import { GetUserRequest } from "../../../application/dtos/requests/GetUserRequest.ts";
// import { UserResponse } from "../../../application/dtos/responses/UserResponse.ts";
// import { UserDao } from "../../data_access/UserDao.ts";
// import { PgUser } from "../entities/PgUser.ts";
// import { DataMapper } from "../../../application/data_mapping/DataMapper.ts";
// import * as bcrypt from "bcrypt";
// import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

import { Client, Pool, QueryConfig } from "pg";
import { ICreateUserRequest } from "../../../application/dtos/requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../../application/dtos/requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../../application/dtos/requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../application/dtos/requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../../application/dtos/requests/IGetUserRequest.ts";
import { IUserResponse } from "../../../application/dtos/responses/IUserResponse.ts";
import { IUserDao } from "./IUserDao.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import { IPgUser } from "../entities/IPgUser.ts";
import * as bcrypt from "bcrypt";
import logger from "../../../../SillyStoreCommon/logging/Logger.ts";

// TODO: test createAsync
export default class PgUserDao implements IUserDao {
    private db: Client | Pool;
    private dataMapper: IDataMapper<IPgUser, IUserResponse>;
    private numSaltRounds: number;

    constructor({
        db,
        dataMapper,
        numSaltRounds = 10,
    }: {
        db: Client | Pool;
        dataMapper: IDataMapper<IPgUser, IUserResponse>;
        numSaltRounds?: number;
    }) {
        this.db = db;
        this.dataMapper = dataMapper;
        this.numSaltRounds = numSaltRounds;
        logger.debug("SALT ROUNDS IS", this.numSaltRounds);
    }

    async createAsync({
        username,
        pw,
        email,
    }: ICreateUserRequest): Promise<IUserResponse> {
        const pwHash: string = await bcrypt.hash(pw, this.numSaltRounds);
        const sql: QueryConfig = {
            text: `
                INSERT INTO users (username, pw_hash, email)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            values: [username, pwHash, email],
        };
        logger.debug("running sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        logger.debug("result: ", row);
        return this.dataMapper(row);
    }

    async getAllAsync(dto: IGetAllUsersRequest): Promise<IUserResponse[]> {
        throw new Error("Method not implemented.");
    }
    async getAsync(dto: IGetUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(dto: IDeleteUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }
    async getByCredentialsAsync({
        username,
        pw,
        email,
    }: IGetUserByCredentialsRequest): Promise<IUserResponse | null> {
        const sql: QueryConfig = {
            text: `
                SELECT * FROM users
                WHERE username = $1
                AND email = $2
            `,
            values: [username, email],
        };
        logger.debug("running sql: ", sql);
        const { rows } = await this.db.query(sql);
        logger.debug("result: ", rows);
        for (const row of rows) {
            const hasMatchingPassword: boolean = await bcrypt.compare(
                pw,
                row.pw_hash,
            );
            if (hasMatchingPassword) {
                return this.dataMapper(row);
            }
        }
        logger.debug("no match found!");
        return null;
    }
}
