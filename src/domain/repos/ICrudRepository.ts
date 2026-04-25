export interface IGenericRepository<
    ICreateRequest,
    IGetAllRequest,
    IGetRequest,
    IDeleteRequest,
    IResponse,
> {
    createAsync(dto: ICreateRequest): Promise<IResponse>;
    getAllAsync(dto: IGetAllRequest): Promise<IResponse[]>;
    getAsync(dto: IGetRequest): Promise<IResponse | null>;
    deleteAsync(dto: IDeleteRequest): Promise<IResponse | null>;
}

export interface ICrudRepository<
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
