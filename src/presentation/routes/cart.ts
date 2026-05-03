import * as express from "express";
import requireSignedIn from "../../application/middleware/RequireSignedIn.ts";
import tryGetPendingCartAsync from "./TryGetPendingCartAsync.ts";
import tryGetPendingOrderAsync from "../../application/middleware/TryGetPendingOrderAsync.ts";

const cartRouter: express.Router = express.Router();
cartRouter.use(requireSignedIn);
cartRouter.route("/pending").get(tryGetPendingCartAsync);
// cartRouter.route("/pending").put(tryOverwriteCartAsync);

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
