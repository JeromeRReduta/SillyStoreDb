import * as express from "express";
import { Router } from "express";
import tryGetAllProductsAsync from "../../application/middleware/TryGetAllProductsAsync.ts";
import tryGetProductAsync from "../../application/middleware/TryGetProductAsync.ts";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryGetOrdersIncludingProductAsync from "../../application/middleware/TryGetOrdersIncludingProductAsync.ts";

const productRouter: Router = express.Router();

productRouter.route("/").get(tryGetAllProductsAsync);

// don't have to validate id is in param, since this route literally won't be called if it's missing
productRouter.route("/:id").get(tryGetProductAsync);

productRouter
    .route("/:id/orders")
    .get(requireSignedIn("CLIENT"), tryGetOrdersIncludingProductAsync);
export default productRouter;
