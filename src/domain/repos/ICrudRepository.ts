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
