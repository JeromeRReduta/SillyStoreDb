import { type TokenResponse } from "../../infrastructure/psql/dtos/responses/TokenResponse.ts";

export interface getUserAsyncInfo {
    readonly username: string;
    readonly pw: string;
}

export interface createUserAsyncInfo {
    readonly username: string;
    readonly pw: string;
    readonly email: string;
}

export default interface UserRepository {
    getByInfoAsync({
        username,
        pw,
    }: getUserAsyncInfo): Promise<TokenResponse | null>;
    createAsync({
        username,
        pw,
        email,
    }: createUserAsyncInfo): Promise<TokenResponse | null>;
}
