import * as express from "express";
import requireBody from "../../application/middleware/RequireBody.ts";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryCreateOrderAsync from "../../application/middleware/TryCreateOrderAsync.ts";
import tryGetAllOwnedOrdersAsync from "../../application/middleware/TryGetAllOwnedOrdersAsync.ts";
import tryGetOwnedOrderAsync from "../../application/middleware/TryGetOwnedOrderAsync.ts";
import tryGetPendingOrderAsync from "../../application/middleware/TryGetPendingOrderAsync.ts";
import tryUpdatePendingOrderAsync from "../../application/middleware/TryUpdatePendingOrderAsync.ts";

/** TODO:
 * Frontend:
 * * make useMutation for cart data - 1 usemutation/action:
 * * useMutation: change user token, run query again - run when user logs in or out
 * * useMutation: update values in db - run when user logs out or when we finalize order
 *      - should be able to update both the values of order-products (i.e. cart items) and
 *          the order status
 */

const orderRouter: express.Router = express.Router();
orderRouter.use(requireSignedIn);
orderRouter.route("/").get(tryGetAllOwnedOrdersAsync);
orderRouter.route("/").post(requireBody(["dateStr"]), tryCreateOrderAsync);
orderRouter.route("/pending").get(tryGetPendingOrderAsync);
orderRouter.route("/:id").get(tryGetOwnedOrderAsync);
orderRouter
    .route("/pending")
    .put(requireBody(["dateStr", "status"]), tryUpdatePendingOrderAsync);

export default orderRouter;
