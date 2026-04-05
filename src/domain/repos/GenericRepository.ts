export interface GenericRepository<
    TGetAllRequest,
    TGetRequest,
    TCreateRequest,
    TDeleteRequest,
    TResponse,
> {
    getAllAsync(dto: TGetAllRequest): Promise<TResponse[]>;
    getAsync(dto: TGetRequest): Promise<TResponse | null>;
    createAsync(dto: TCreateRequest): Promise<TResponse>;
    deleteAsync(dto: TDeleteRequest): Promise<TResponse | null>;
}
