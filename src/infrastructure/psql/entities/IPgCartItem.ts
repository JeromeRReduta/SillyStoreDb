import { ICartItem } from "../../../../SillyStoreCommon/domain-objects/CartItem.ts";

export interface IPgCartItem {
    readonly order_id: ICartItem["orderId"];
    readonly product_id: ICartItem["productId"];
    readonly quantity: ICartItem["quantity"];
    readonly creator_id?: ICartItem["creatorId"];
}
