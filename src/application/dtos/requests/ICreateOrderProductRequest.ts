export interface ICreateOrderProductRequest {
    readonly orderId: number;
    readonly productId: number;
    readonly quantity: number;
    readonly userId: number | null; // for all order product requests, userId = null means ADMIN; i.e. don't bother checking if you own order/orderproduct entry
}
