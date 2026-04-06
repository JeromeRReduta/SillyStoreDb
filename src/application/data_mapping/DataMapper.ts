export interface DataMapper<TDbEntity, TResponse> {
    apply: (entity: TDbEntity) => TResponse;
}
