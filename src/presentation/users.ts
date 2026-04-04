import express from "express";
import HttpStatus from "../application/StatusCodes.ts";

const userRouter = express.Router();

userRouter.route("/register").post(async (req, res) => {
    await res.locals.registerCommandHandler.handleAsync(req, res);
    return { code: HttpStatus.CREATED, response: res.locals.result };
});

userRouter.route("/login");

export default userRouter;
