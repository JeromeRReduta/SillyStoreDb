import { type Order } from "../../../SillyStoreCommon/domain-objects/Order.ts";
import { type OrderProduct } from "../../../SillyStoreCommon/domain-objects/OrderProduct.ts";
import { type Product } from "../../../SillyStoreCommon/domain-objects/Product.ts";

export default interface OrderRepository {
    getAllAsync(): Promise<Order[] | null>;
    getByIdAsync(id: number): Promise<Order | null>;
    getProductsInOrderAsync(id: number): Promise<Product[] | null>;
    createAsync(dateStr: string): Promise<Order | null>;
    addProductToOrderAsync({
        productId,
        orderId,
        quantity,
    }: OrderProduct): Promise<OrderProduct | null>;
}
