import { Response } from "express";
import { TokenResponse } from "../dtos/responses/TokenResponse.ts";
import logger from "../../../SillyStoreCommon/logging/Logger.ts";

export function saveToken(
    token: TokenResponse,
    res: Response<{ token: TokenResponse }>,
): void {
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });
}
