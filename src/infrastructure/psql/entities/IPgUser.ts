import { IUser } from "../../../../SillyStoreCommon/domain-objects/User.ts";

export interface IPgUser {
    readonly id: IUser["id"];
    readonly username: IUser["username"];
    readonly email: IUser["email"];
    readonly role: IUser["role"];
    readonly pw_hash: string;
}
