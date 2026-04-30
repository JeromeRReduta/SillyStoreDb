import { ICrudDao } from "../../infrastructure/data_access/ICrudDao.ts";
import { ICrudRepository } from "./ICrudRepository.ts";

/**
 * Abstract base class for any CRUD repository that exposes CRUD functionality. Note that this
 * doesn't mean the repo ONLY HAS 1 dao, but that the base CRUD functions are implemented around
 * one specific dao
 */
export default abstract class AbstractBaseCrudRepository<
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TUpdateRequest,
    TDeleteRequest,
    TResponse,
> implements ICrudRepository<
    TCreateRequest,
    TGetAllRequest,
    TGetRequest,
    TUpdateRequest,
    TDeleteRequest,
    TResponse
> {
    protected dao: ICrudDao<
        TCreateRequest,
        TGetAllRequest,
        TGetRequest,
        TUpdateRequest,
        TDeleteRequest,
        TResponse
    >;

    constructor(
        dao: ICrudDao<
            TCreateRequest,
            TGetAllRequest,
            TGetRequest,
            TUpdateRequest,
            TDeleteRequest,
            TResponse
        >,
    ) {
        this.dao = dao;
    }

    async createAsync(dto: TCreateRequest): Promise<TResponse> {
        return await this.dao.createAsync(dto);
    }

    async getAllAsync(dto: TGetAllRequest): Promise<TResponse[]> {
        return await this.dao.getAllAsync(dto);
    }

    async getAsync(dto: TGetRequest): Promise<TResponse | null> {
        return await this.dao.getAsync(dto);
    }

    async updateAsync(dto: TUpdateRequest): Promise<TResponse | null> {
        return await this.dao.updateAsync(dto);
    }

    async deleteAsync(dto: TDeleteRequest): Promise<TResponse | null> {
        return await this.dao.deleteAsync(dto);
    }
}
