import * as express from "express";
import requireBody from "../../application/middleware/RequireBody.ts";
import tryRegisterAsync from "../../application/middleware/TryRegisterAsync.ts";
import tryLoginAsync from "../../application/middleware/TryLoginAsync.ts";

const userRouter = express.Router();
userRouter
    .route("/register")
    .post(requireBody(["username", "email", "pw"]), tryRegisterAsync);
userRouter
    .route("/login")
    .post(requireBody(["username", "email", "pw"]), tryLoginAsync);

export default userRouter;
