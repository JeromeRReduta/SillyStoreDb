export interface EntityRepository<TCreateRequest, TEntityDto> {
    getAllAsync(userId?: number): Promise<TEntityDto[]>;
    getByIdAsync(entityId: number): Promise<TEntityDto | null>;
    createAsync(request: TCreateRequest): Promise<TEntityDto>;
}
