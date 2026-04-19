import jwt from "jsonwebtoken";
import backendConfigs from "../../configs/BackendConfigs.ts";

const SECRET: jwt.Secret = backendConfigs.jwt.secret;

/**
 * From FullStack Academy assignment
 */
export default class tokenOps {
    static create(payload: string | object | Buffer<ArrayBufferLike>) {
        return jwt.sign(payload, SECRET, { expiresIn: "7d" });
    }

    static verify(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, SECRET);
    }
}
