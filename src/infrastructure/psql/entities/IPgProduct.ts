import { IProduct } from "../../../../SillyStoreCommon/domain-objects/Product.ts";

export interface IPgProduct {
    readonly id: IProduct["id"];
    readonly image_src: IProduct["imageSrc"];
    readonly title: IProduct["title"];
    readonly description: IProduct["description"];
    readonly price: IProduct["price"];
}
