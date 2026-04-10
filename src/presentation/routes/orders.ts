import * as express from "express";
import { Router } from "express";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";

const orderRouter: Router = express.Router();
orderRouter.use(requireSignedIn); // universal requirement - must be signed in

export default orderRouter;

// const productRouter: Router = express.Router();

// productRouter.route("/").get(tryGetAllProductsAsync);

// // don't have to validate id is in param, since this route literally won't be called if it's missing
// productRouter.route("/:id").get(tryGetProductAsync);

// productRouter
//     .route("/:id/orders")
//     .get(requireSignedIn, tryGetOrdersIncludingProductAsync);
// export default productRouter;
