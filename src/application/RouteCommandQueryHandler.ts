import { Request } from "express";

/**
 * Interface for handlers for a command/query. Note that the promise
 * type is Promise\<void\>, as results must be saved in res.locals or req.session (and maybe app.locals but we dont support that yet)
 *
 * @type {_TResponse} type of response from repository call
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RouteCommandQueryHandler<_TResponse> {
    /**
     * Runs all logging, validation, and repository calls. To save any value from here, save it in
     * res.locals/req.session for per-request/per-session data storage, respectively
     * @param req Express Request
     * @param res Express Response
     */
    handleAsync(req: Request, res: Response): Promise<void>;
}
