/**
 * Data access object
 * @type {TResponse}
 * @type {TCreateRequest}
 * @type {TGetAllRequest}
 * @type {TGetRequest}
 * @type {TDeleteRequest}
 */
export interface Repository<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TResponse,
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TDeleteRequest,
> {
    createAsync(request: TCreateRequest): Promise<TResponse>;
    getAllAsync(request: TGetAllRequest): Promise<TResponse>;
    getAsync(request: TGetRequest): Promise<TResponse>;
    deleteAsync(request: TDeleteRequest): Promise<TResponse>;
}
