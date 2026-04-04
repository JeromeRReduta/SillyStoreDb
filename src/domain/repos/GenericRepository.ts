export interface GenericRepository<
    TGetAllRequest,
    TGetRequest,
    TDeleteRequest,
    TResponse,
> {
    getAllAsync(requestDto: TGetAllRequest): Promise<TResponse>;
    getAsync(requestDto: TGetRequest): Promise<TResponse | null>;
    deleteAsync(requestDto: TDeleteRequest): Promise<TResponse | null>;
}
