import { Request } from "express";
import { RouteCommandQueryHandler } from "../RouteCommandQueryHandler.ts";

export default class RegisterUserCommandHandler implements RouteCommandQueryHandler<TokenResponse> {
    handleAsync(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
