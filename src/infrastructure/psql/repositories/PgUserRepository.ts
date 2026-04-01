import { QueryConfig, type Client } from "pg";
import { type token } from "../../../../SillyStoreCommon/domain-objects/Token.ts";
import type UserRepository from "../../../domain/repositories/UserRepository.ts";
import type {
    createUserAsyncInfo,
    getUserAsyncInfo,
} from "../../../domain/repositories/UserRepository.ts";
import bcrypt from "bcrypt";

export default class PgUserRepository implements UserRepository {
    private static readonly numSaltRounds: number = 10;
    private readonly db: Client;
    private readonly dbName: string;

    constructor(db: Client, dbName: string) {
        this.db = db;
        this.dbName = dbName;
    }

    async getByInfoAsync({
        username,
        pw,
    }: getUserAsyncInfo): Promise<token | null> {}
    async createAsync({
        username,
        pw,
        email,
    }: createUserAsyncInfo): Promise<token | null> {
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
        return result; // TODO: add dbToDomainMapper for user!
    }
    /** TODO: stub */
}
