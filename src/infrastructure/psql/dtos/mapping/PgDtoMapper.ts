export interface PgDtoMapper<TPgEntity, TPgResponse> {
    apply(entity: TPgEntity): TPgResponse;
}
