// import { type CreateOrderRequest } from "../../../SillyStoreCommon/requests/CreateOrderRequest.ts";
// import { type OrderResponse } from "../../infrastructure/psql/dtos/responses/OrderResponse.ts";

import { type CreateOrderRequest } from "../../../SillyStoreCommon/requests/CreateOrderRequest.ts";
import { type OrderResponse } from "../../infrastructure/psql/dtos/responses/OrderResponse.ts";
import { type EntityRepository } from "./EntityRepository.ts";

export interface OrderRepository extends EntityRepository<
    CreateOrderRequest,
    OrderResponse
> {
    getOrdersIncludingProductAsync(productId: number): Promise<OrderResponse[]>;
}

// export default interface OrderRepository {
//     /**
//      * @param userId
//      * @note requires userId for db optimization - otherwise it returns ALL orders and then we filter it down in service layer
//      */
//     getAllAsync(userId: number): Promise<OrderResponse[]>;

//     /**
//      * @param orderId
//      * @note does not require userId here - matching user id should be done in service layer
//      */
//     getByIdAsync(orderId: number): Promise<OrderResponse | null>;

//     /**
//      *
//      * @param orderId
//      * @note does not require userId here - matching user id should be done in service layer
//      */
//     getProductsInOrderAsync(orderId: number): Promise<OrderResponse | null>;

//     /**
//      *
//      * @param createOrderRequest
//      * @note requires userId here since we're inserting into db
//      * @note On db error, this will throw exception, so don't need to return null if db call fails
//      *
//      */
//     createAsync({
//         userId,
//         dateStr,
//     }: CreateOrderRequest): Promise<OrderResponse>;
// }
