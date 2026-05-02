import * as express from "express";
import { Router } from "express";
import tryGetAllProductsAsync from "../../application/middleware/TryGetAllProductsAsync.ts";
import tryGetProductAsync from "../../application/middleware/TryGetProductAsync.ts";

const productRouter: Router = express.Router();
productRouter.route("/").get(tryGetAllProductsAsync);
productRouter.route("/:id").get(tryGetProductAsync);

export default productRouter;
