export type IDataMapper<TDbEntity, TResponse> = (
    entity: TDbEntity,
) => TResponse;
