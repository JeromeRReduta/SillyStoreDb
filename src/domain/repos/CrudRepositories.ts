import { ICrudDao } from "../../infrastructure/data_access/ICrudDao.ts";

interface CrudRepositoriesInfo<TRequest, TResponse> {
    readonly dao: ICrudDao<
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        TResponse
    >;
    readonly dto: TRequest;
}

/** Utility methods for CRUD repositories */
export default class CrudRepositories {
    static async createAsync<TCreateRequest, TResponse>({
        dao,
        dto,
    }: CrudRepositoriesInfo<TCreateRequest, TResponse>): Promise<TResponse> {
        return await dao.createAsync(dto);
    }

    static async getAllAsync<TGetAllRequest, TResponse>({
        dao,
        dto,
    }: CrudRepositoriesInfo<TGetAllRequest, TResponse>): Promise<TResponse[]> {
        return await dao.getAllAsync(dto);
    }

    static async getAsync<TGetRequest, TResponse>({
        dao,
        dto,
    }: CrudRepositoriesInfo<
        TGetRequest,
        TResponse
    >): Promise<TResponse | null> {
        return await dao.getAsync(dto);
    }

    static async updateAsync<TUpdateRequest, TResponse>({
        dao,
        dto,
    }: CrudRepositoriesInfo<
        TUpdateRequest,
        TResponse
    >): Promise<TResponse | null> {
        return await dao.updateAsync(dto);
    }

    static async deleteAsync<TDeleteRequest, TResponse>({
        dao,
        dto,
    }: CrudRepositoriesInfo<
        TDeleteRequest,
        TResponse
    >): Promise<TResponse | null> {
        return await dao.deleteAsync(dto);
    }
}
