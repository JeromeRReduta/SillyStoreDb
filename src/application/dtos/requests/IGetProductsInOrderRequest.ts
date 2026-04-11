export interface IGetProductsInOrderRequest {
    readonly orderId: number;
    readonly userId: number | null;
    readonly includingQuantities: boolean;
}
