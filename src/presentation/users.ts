import express from "express";
import RegisterUserCommandHandler from "../application/handlers/userRoute/RegisterUserCommandHandlerBundle.ts";

const userRouter = express.Router();

userRouter.route("/register").post(async (req, res, next) => {
    const registerUserCommandHandler: RegisterUserCommandHandler =
        req.registerUserCommandHandler;
    await registerUserCommandHandler.handleAsync(req, res, next);
});

userRouter.route("/login");

export default userRouter;
