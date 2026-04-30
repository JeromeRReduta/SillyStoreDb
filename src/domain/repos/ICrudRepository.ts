/**
 * Repository w/ CRUD capabilities
 */
export interface ICrudRepository<
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TUpdateRequest,
    TDeleteRequest,
    TResponse,
> {
    /**
     *
     * @param {TCreateRequest} dto create request dto
     * @returns {Promise<TResponse>} created response dto
     */
    createAsync(dto: TCreateRequest): Promise<TResponse>;

    /**
     *
     * @param {TGetAllRequest} dto get all request dto
     * @returns {Promise<TResponse[]>} dtos for found data
     */
    getAllAsync(dto: TGetAllRequest): Promise<TResponse[]>;

    /**
     *
     * @param {TGetRequest} dto get request dto
     * @returns {Promise<TResponse | null>} response dto if an entry exists, else null
     */
    getAsync(dto: TGetRequest): Promise<TResponse | null>;

    /**
     *
     * @param {TUpdateRequest} dto update request dto
     * @returns {Promise<TResponse | null>} response dto if an entry has been updated, else null
     */
    updateAsync(dto: TUpdateRequest): Promise<TResponse | null>;

    /**
     *
     * @param {TDeleteRequest} dto delete request dto
     * @returns {Promise<TResponse | null>} response dto if an entry has been deleted, else null
     */
    deleteAsync(dto: TDeleteRequest): Promise<TResponse | null>;
}
