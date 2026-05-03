import * as express from "express";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryGetPendingCartAsync from "./TryGetPendingCartAsync.ts";
import requireBody from "../../application/middleware/RequireBody.ts";
import tryOverwritePendingCartAsync from "./TryOverwritePendingCartAsync.ts";

const cartRouter: express.Router = express.Router();
cartRouter.use(requireSignedIn);
cartRouter.route("/pending").get(tryGetPendingCartAsync);
cartRouter
    .route("/pending")
    .put(requireBody(["cartItems"]), tryOverwritePendingCartAsync);

export default cartRouter;

// async getPendingCartItemsAsync(
//     dto: IGetPendingCartItemsRequest,
// ): Promise<ICartItemResponse[]> {
//     return await this.cartItemDao.getAllPendingAsync(dto);
// }

// async overwritePendingCart(
//     dto: IMergeCartItemsInOrderRequest,
// ): Promise<void> {
//     await this.cartItemDao.mergePendingCartAsync(dto);
// }
