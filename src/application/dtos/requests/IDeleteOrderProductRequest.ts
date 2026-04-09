export interface IDeleteOrderProductRequest {
    readonly orderId: number;
    readonly productId: number;
    readonly userId: number | null;
}
