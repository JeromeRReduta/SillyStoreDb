export type DataMapper<TDbEntity, TResponse> = (entity: TDbEntity) => TResponse;
