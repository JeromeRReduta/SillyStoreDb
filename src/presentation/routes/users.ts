import express, { NextFunction, Request, Response, Router } from "express";
import { UserResponse } from "../../application/dtos/responses/UserResponse.ts";
import { CreateUserRequest } from "../../application/dtos/requests/CreateUserRequest.ts";
import requireBody from "../../application/middleware/RequireBody.ts";
import tokenOps from "../../application/jwt/TokenOperations.ts";
import HttpStatus from "../../application/http/HttpStatus.ts";
import RegisterUser from "../../application/use_cases/RegisterUser.ts";
import SimpleUserRepository from "../../domain/repos/SimpleUserRepository.ts";
import PgUserDao from "../../infrastructure/psql/data_access/PgUserDao.ts";
import { db } from "../../configs/BackendConfigs.ts";
import PgMapper from "../../infrastructure/psql/data_mapping/PgMapper.ts";
import { UseCase } from "../../application/use_cases/UseCase.ts";
const userRouter: Router = express.Router();

const register: UseCase<CreateUserRequest, { token: string }> =
    new RegisterUser(
        new SimpleUserRepository(new PgUserDao(db, PgMapper.toUser)),
    );

userRouter.route("/login").post(
    requireBody(["username", "pw", "email"]),
    async (
        req: Request<object, { token: string }, CreateUserRequest>,
        res: Response<{ token: string }>,
    ) => {
        const { token } = await register.callAsync(req.body);
        res.status(HttpStatus.CREATED).send({ token });
    },
    // (req, res, next) => {
    //     res.status(HttpStatus.CREATED).send({ token: "TOKEN" });
    // },
);

export default userRouter;
