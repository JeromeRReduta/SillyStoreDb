export interface IAddOrderToProductRequest {
    readonly orderId: number;
    readonly productId: number;
    readonly quantity: number;
    readonly userId: number | null;
}
