import { IOrderProductResponse } from "../../../application/dtos/responses/IOrderProductResponse.ts";

export interface IOrderProductDao {
    createAsync(
        dto: ICreateOrderProductRequest,
    ): Promise<IOrderProductResponse>;

    getAllAsync(
        dto: IGetAllOrderProductsRequest,
    ): Promise<IOrderProductResponse>;
    getAsync(dto: IGetOrderProductRequest): Promise<IOrderProductDao | null>;
    deleteAsync(
        dto: IDeleteOrderProductRequest,
    ): Promise<IOrderProductResponse>;
    getOrdersIncludingProductAsync(dto: IGetOrder);

    // createAsync(dto: ICreateProductRequest): Promise<IProductResponse>;
    // getAllAsync(dto: IGetAllProductsRequest): Promise<IProductResponse[]>;
    // getAsync(dto: IGetProductRequest): Promise<IProductResponse | null>;
    // deleteAsync(dto: IDeleteProductRequest): Promise<IProductResponse | null>;
    // getOrdersIncludingProductAsync(...)
    // getProductsInOrderAsync(...)
}
