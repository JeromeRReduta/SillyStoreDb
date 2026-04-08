import * as express from "express";
import requireBody from "../../application/middleware/RequireBody.ts";
import tryRegisterAsync from "../../application/middleware/TryRegisterAsync.ts";

const userRouter = express.Router();

userRouter
    .route("/login")
    .post(requireBody(["username", "email", "pw"]), tryRegisterAsync);

export default userRouter;
