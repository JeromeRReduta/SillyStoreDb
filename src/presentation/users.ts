import express from "express";
import HttpStatus from "../application/StatusCodes.ts";
import RegisterUserCommandHandler from "../application/register_user/RegisterUserCommandHandler.ts";

const userRouter = express.Router();

userRouter.route("/register").post(async (req, res, next) => {
    const registerUserCommandHandler: RegisterUserCommandHandler = res.locals.registerUserCommandHandler;
    await registerUserCommandHandler.handleAsync(req, res, next);
}
});

userRouter.route("/login");

export default userRouter;
