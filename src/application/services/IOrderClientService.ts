import {
    ICreateOrderRequest,
    IOrderResponse,
    IGetAllOrdersRequest,
    IGetOrderRequest,
    IGetAllPendingOrdersRequest,
} from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import {
    IProductResponse,
    IProductWithQuantityResponse,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";

export interface IClientOrderService {
    createAsync(dto: ICreateOrderRequest): Promise<IOrderResponse>;

    getAllOwnedAsync(dto: IGetAllOrdersRequest): Promise<IOrderResponse[]>;

    getAsync(dto: IGetOrderRequest): Promise<IOrderResponse>;

    addProductToOrderAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse>;

    getProductsInOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductResponse[]>;

    getPendingOrderAsync( // note - repo call gets all pending orders, filtered by user. For client, this will return 0 or 1 order
        dto: IGetAllPendingOrdersRequest,
    ): Promise<IOrderResponse | null>;

    getProductsWithQuantitiesInPendingOrderAsync(
        dto: IGetProductsInOrderRequest,
    ): Promise<IProductWithQuantityResponse[]>;
}
