// import { type Order } from "../../../SillyStoreCommon/domain-objects/Order.ts";
// import { type Product } from "../../../SillyStoreCommon/domain-objects/Product.ts";

import { ProductResponse } from "../../infrastructure/psql/dtos/responses/ProductResponse.ts";
import { EntityRepository } from "./EntityRepository.ts";
export interface CreateProductRequest {
    // TODO: put this in requests folder - even if only admin will use this, it's still impt to have this functionality
    readonly imageSrc: string;
    readonly title: string;
    readonly description: string;
    readonly price: number;
}

export interface ProductRepository extends EntityRepository<
    CreateProductRequest,
    ProductResponse
> {
    getProductsInOrderAsync(orderId: number): Promise<ProductResponse[]>;
}

// /**
//  * TODO:
//  *
//  */
// export default interface ProductRepository {
//     getAllAsync(): Promise<Product[] | null>;
//     getByIdAsync(id: number): Promise<Product | null>;
//     getOrdersIncludingProductAsync(productId: number): Promise<Order[] | null>;
// }
