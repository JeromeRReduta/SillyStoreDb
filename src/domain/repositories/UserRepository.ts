import { type token } from "../../../SillyStoreCommon/domain-objects/Token.ts";

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
    getUserAsync({ username, pw }: getUserAsyncInfo): Promise<token | null>;
    createUserAsync({
        username,
        pw,
        email,
    }: createUserAsyncInfo): Promise<token | null>;
}
