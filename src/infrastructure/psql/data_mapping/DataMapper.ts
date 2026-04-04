export interface DataMapper<TPgEntity, TResponse> {
    apply(entity: TPgEntity): TResponse;
}
