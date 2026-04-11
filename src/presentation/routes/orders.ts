import * as express from "express";
import { Router } from "express";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryGetAllOwnedOrdersAsync from "../../application/middleware/TryGetAllOwnedOrdersAsync.ts";
import tryGetOwnedOrderAsync from "../../application/middleware/TryGetOwnedOrderAsync.ts";
import requireBody from "../../application/middleware/RequireBody.ts";
import tryCreateOrderAsync from "../../application/middleware/TryCreateOrderAsync.ts";
import tryGetProductsInOrderAsync from "../../application/middleware/TryGetProductsInOrderAsync.ts";

const orderRouter: Router = express.Router();
orderRouter.use(requireSignedIn("CLIENT")); // universal requirement - must be signed in

orderRouter
    .route("/")
    .get(tryGetAllOwnedOrdersAsync)
    .post(requireBody(["dateStr"]), tryCreateOrderAsync);
orderRouter.route("/:id").get(tryGetOwnedOrderAsync);

orderRouter.route("/:id/products").get(tryGetProductsInOrderAsync);

export default orderRouter;

// const productRouter: Router = express.Router();

// productRouter.route("/").get(tryGetAllProductsAsync);

// // don't have to validate id is in param, since this route literally won't be called if it's missing
// productRouter.route("/:id").get(tryGetProductAsync);

// productRouter
//     .route("/:id/orders")
//     .get(requireSignedIn, tryGetOrdersIncludingProductAsync);
// export default productRouter;
