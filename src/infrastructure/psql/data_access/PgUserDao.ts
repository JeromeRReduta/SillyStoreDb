/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Pool, QueryConfig } from "pg";
import { ICreateUserRequest } from "../../../../SillyStoreCommon/dtos/requests/ICreateUserRequest.ts";
import { IDeleteUserRequest } from "../../../../SillyStoreCommon/dtos/requests/IDeleteUserRequest.ts";
import { IGetAllUsersRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetAllUsersRequest.ts";
import { IGetUserByCredentialsRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetUserByCredentialsRequest.ts";
import { IGetUserRequest } from "../../../../SillyStoreCommon/dtos/requests/IGetUserRequest.ts";
import { IUserResponse } from "../../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IDataMapper } from "../../../application/data_mapping/DataMapper.ts";
import backendLogger from "../../../configs/BackendLogger.ts";
import { IUserDao } from "../../data_access/IUserDao.ts";
import { IPgUser } from "../entities/IPgUser.ts";
import * as bcrypt from "bcrypt";

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
        backendLogger.debug("running sql: ", sql);
        const {
            rows: [row],
        } = await this.db.query(sql);
        backendLogger.debug("result: ", row);
        return this.dataMapper(row);
    }

    async getAllAsync(_dto: IGetAllUsersRequest): Promise<IUserResponse[]> {
        throw new Error("Method not implemented.");
    }
    async getAsync(_dto: IGetUserRequest): Promise<IUserResponse | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(_dto: IDeleteUserRequest): Promise<IUserResponse | null> {
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
        backendLogger.debug("running sql: ", sql);
        const { rows } = await this.db.query(sql);
        backendLogger.debug("result: ", rows);
        for (const row of rows) {
            const hasMatchingPassword: boolean = await bcrypt.compare(
                pw,
                row.pw_hash,
            );
            if (hasMatchingPassword) {
                return this.dataMapper(row);
            }
        }
        backendLogger.debug("no match found!");
        return null;
    }
}
