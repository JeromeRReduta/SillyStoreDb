export interface ICrudDao<
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TUpdateRequest,
    TDeleteRequest,
    TResponse,
> {
    createAsync(dto: TCreateRequest): Promise<TResponse>;
    getAllAsync(dto: TGetAllRequest): Promise<TResponse[]>;
    getAsync(dto: TGetRequest): Promise<TResponse | null>;
    updateAsync(dto: TUpdateRequest): Promise<TResponse | null>;
    deleteAsync(dto: TDeleteRequest): Promise<TResponse | null>;
}
