// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express-serve-static-core";
import { UserRole } from "../../SillyStoreCommon/domain-objects/User.ts";

declare global {
    namespace Express {
        interface Request {
            userInfo: {
                readonly id: number;
                readonly role: UserRole;
            };
        }
    }
}
