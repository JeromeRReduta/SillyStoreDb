export interface IGetOrderProductRequest {
    readonly orderId: number;
    readonly productId: number;
    readonly userId: number | null;
}
