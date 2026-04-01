import { Order } from "../../../SillyStoreCommon/domain-objects/Order.ts";
import { Product } from "../../../SillyStoreCommon/domain-objects/Product.ts";

export default interface ProductRepository {
    getAllProductsAsync(): Promise<Product[] | null>;
    getProductByIdAsync(id: number): Promise<Product | null>;
    getOrdersIncludingProductAsync(productId: number): Promise<Order[] | null>;
}
