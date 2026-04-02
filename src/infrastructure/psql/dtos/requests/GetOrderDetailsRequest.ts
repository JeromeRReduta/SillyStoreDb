/**
 * Shared request shape for getting order by given orderId, or for getting products in order by given orderId
 */
export interface GetOrderDetailsRequest {
    readonly userId: number;
    readonly orderId: number;
}
