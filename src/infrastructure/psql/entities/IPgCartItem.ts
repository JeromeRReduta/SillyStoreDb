import { ICartItem } from "../../../../SillyStoreCommon/domain-objects/CartItem.ts";

export interface IPgCartItem {
    readonly creator_id?: ICartItem["creatorId"];
    readonly order_id: ICartItem["orderId"];
    readonly product_id: ICartItem["productId"];
    readonly description: ICartItem["description"];
    readonly image_src: ICartItem["imageSrc"];
    readonly price: ICartItem["price"];
    readonly quantity: ICartItem["quantity"];
    readonly title: ICartItem["title"];
}
