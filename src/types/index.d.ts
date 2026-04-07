// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express-serve-static-core";

declare global {
    namespace Express {
        interface Request {
            session: {
                token?: string;
            };
            // registerUserCommandHandler?: RegisterUserCommandHandler;
            userId?: number;
        }
    }
}
