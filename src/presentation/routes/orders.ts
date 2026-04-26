import * as express from "express";
import { Router } from "express";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryGetAllOwnedOrdersAsync from "../../application/middleware/TryGetAllOwnedOrdersAsync.ts";
import tryGetOwnedOrderAsync from "../../application/middleware/TryGetOwnedOrderAsync.ts";
import requireBody from "../../application/middleware/RequireBody.ts";
import tryCreateOrderAsync from "../../application/middleware/TryCreateOrderAsync.ts";
import tryGetProductsInOrder from "../../application/middleware/TryGetProductsInOrderAsync.ts";
import tryAddProductToOrderAsync from "../../application/middleware/TryAddProductToOrderAsync.ts";
import { IOrderDao } from "../../infrastructure/data_access/IOrderDao.ts";
import PgOrderDao from "../../infrastructure/psql/data_access/PgOrderDao.ts";
import backendConfigs from "../../configs/BackendConfigs.ts";
import pgDataMappers from "../../application/data_mapping/PgDataMappers.ts";

/** TODO:
 *
 *
 * Backend:
 * * (x) orders should have new column: status = "pending" | "completed" | "canceled"
 * * (x) make unique index pending_order ON table orders (user_id) WHERE (status = "PENDING")
 *
 * Common:
 * * make ICartItemResponse: Literally IProductResponse & {quantity: number}
 *
 * Backend p2:
 * * orderproductdao(interface and impl): getCartItemsAsync
 * * orderrepo(interface and impl): getCartItemsAsync
 * * clientorderservice (interface and impl): getCartItemsAsync - if repo.getCartItemsAsync() returns empty [], this method returns null
 * * middleware: tryGetCartItemsAsync
 * * orderproductdao (interface and impl): updateCartItemAsync
 * * orderRepo
 * * clientOrderService
 * * middleware: tryUpdateCartItemAsync
 *
 *
 * * make way to get user's pending order (or return null if entity not found)
 * Frontend:
 * * make useMutation for cart data - 1 usemutation/action:
 * * useMutation: change user token, run query again - run when user logs in or out
 * * useMutation: update values in db - run when user logs out or when we finalize order
 *      - should be able to update both the values of order-products (i.e. cart items) and
 *          the order status
 *
 *
 *
 */

const orderRouter: Router = express.Router();
orderRouter.use(requireSignedIn("CLIENT")); // universal requirement - must be signed in

orderRouter
    .route("/")
    .get(tryGetAllOwnedOrdersAsync)
    .post(requireBody(["dateStr"]), tryCreateOrderAsync);

// orderRouter.route("/cart").get(tryGetProductsInCartAsync);

orderRouter.route("/:id").get(tryGetOwnedOrderAsync);

orderRouter
    .route("/:id/products")
    .get(tryGetProductsInOrder(false))
    .post(requireBody(["productId", "quantity"]), tryAddProductToOrderAsync);

orderRouter.route("/:id/cart").get(tryGetProductsInOrder(true));

export default orderRouter;

// const productRouter: Router = express.Router();

// productRouter.route("/").get(tryGetAllsProductsAsync);

// // don't have to validate id is in param, since this route literally won't be called if it's missing
// productRouter.route("/:id").get(tryGetProductAsync);

// productRouter
//     .route("/:id/orders")
//     .get(requireSignedIn, tryGetOrdersIncludingProductAsync);
// export default productRouter;
