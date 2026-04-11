import jwt from "jsonwebtoken";
import configs from "../../../SillyStoreCommon/configs/Configs.ts";

const SECRET: jwt.Secret = configs.jwt.secret;

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
