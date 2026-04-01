import { type Order } from "../../../SillyStoreCommon/domain-objects/Order.ts";
import { type Product } from "../../../SillyStoreCommon/domain-objects/Product.ts";

export default interface ProductRepository {
    getAllAsync(): Promise<Product[] | null>;
    getByIdAsync(id: number): Promise<Product | null>;
    getOrdersIncludingProductAsync(productId: number): Promise<Order[] | null>;
}
