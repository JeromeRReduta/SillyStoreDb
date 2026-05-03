/**
 * Dao w/ CRUD capabilities for 1 database
 */
export interface ICrudDao<
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TUpdateRequest,
    TDeleteRequest,
    TResponse,
> {
    /**
     * Create a db entry
     * @returns {Promise<TResponse>} created entry
     */
    createAsync(dto: TCreateRequest): Promise<TResponse>;

    /**
     * Get all db entries. For dbs which care about who owns the entry (e.g. order.userId), this may filter by user
     * @returns {Promise<TResponse[]>} all (valid) entries
     */
    getAllAsync(dto: TGetAllRequest): Promise<TResponse[]>;

    /**
     * Gets 1 entry matching some criteria
     * @returns {Promise<TResponse | null>} entry if it exists, else null
     */
    getAsync(dto: TGetRequest): Promise<TResponse | null>;

    /**
     * Updates 1 entry matching some criteria
     * @returns {Promise<TResponse | null>} created entry if it exists, else null
     */
    updateAsync(dto: TUpdateRequest): Promise<TResponse | null>;

    /**
     * Deletes 1 entry matching some criteria
     * @returns {Promise<TResponse | null>} deleted entry if it exists, else null
     */
    deleteAsync(dto: TDeleteRequest): Promise<TResponse | null>;
}
