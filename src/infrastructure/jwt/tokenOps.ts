import configs from "../../../SillyStoreCommon/configs/Configs.ts";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken";

/**
 * From FullStack Academy assignment
 */
export default class tokenOps {
    static create(payload: string | object | Buffer<ArrayBufferLike>) {
        return jwt.sign(payload, configs.jwt.secret, { expiresIn: "7d" });
    }

    static verify(token: string): Jwt | JwtPayload | string {
        return jwt.verify(token, configs.jwt.secret);
    }
}
