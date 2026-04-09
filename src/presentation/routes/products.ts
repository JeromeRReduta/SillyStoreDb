import * as express from "express";
import { Router } from "express";
import tryGetAllProductsAsync from "../../application/middleware/TryGetAllProductsAsync.ts";
import tryGetProductAsync from "../../application/middleware/TryGetProductAsync.ts";
// import requireBody from "../../application/middleware/RequireBody.ts";
// import tryRegisterAsync from "../../application/middleware/TryRegisterAsync.ts";
// import tryLoginAsync from "../../application/middleware/TryLoginAsync.ts";

// const userRouter = express.Router();

const productRouter: Router = express.Router();

productRouter.route("/").get(tryGetAllProductsAsync);

// don't have to validate id is in param, since this route literally won't be called if it's missing
productRouter.route("/:id").get(tryGetProductAsync);
export default productRouter;
