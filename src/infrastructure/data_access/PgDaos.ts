import { Client, Pool, QueryConfig } from "pg";
import backendLogger from "../../configs/BackendLogger.ts";
import { IPgUser } from "../psql/entities/IPgUser.ts";
import { IUserResponse } from "../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IPgOrder } from "../psql/entities/IPgOrder.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IPgProduct } from "../psql/entities/IPgProduct.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IPgOrderProduct } from "../psql/entities/IPgOrderProduct.ts";
import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IPgProductWithQuantity } from "../psql/entities/IPgProductWithQuantity.ts";
import { IProductWithQuantityResponse } from "../../../SillyStoreCommon/dtos/responses/IProductWithQuantityResponse.ts";

/** Util class for daos using PG's Client or Pool */
export default class PgDaos {
    static userMapper: IPgDataMapper<IPgUser, IUserResponse> = function ({
        id,
        username,
        email,
    }: IPgUser): IUserResponse {
        return { id, username, email };
    };

    static orderMapper: IPgDataMapper<IPgOrder, IOrderResponse> = function ({
        id,
        date,
        user_id,
        status,
    }: IPgOrder): IOrderResponse {
        return { id, dateStr: date, userId: user_id, status };
    };

    static productMapper: IPgDataMapper<IPgProduct, IProductResponse> =
        function ({
            id,
            image_src,
            title,
            description,
            price,
        }: IPgProduct): IProductResponse {
            return { id, imageSrc: image_src, title, description, price };
        };

    static productWithQuantityMapper: IPgDataMapper<
        IPgProductWithQuantity,
        IProductWithQuantityResponse
    > = function ({
        id,
        image_src,
        title,
        description,
        price,
        quantity,
    }: IPgProductWithQuantity): IProductWithQuantityResponse {
        return { id, imageSrc: image_src, title, description, price, quantity };
    };

    static orderProductMapper: IPgDataMapper<
        IPgOrderProduct,
        IOrderProductResponse
    > = function ({
        order_id,
        product_id,
        quantity,
    }: IPgOrderProduct): IOrderProductResponse {
        return { orderId: order_id, productId: product_id, quantity };
    };

    static async queryAsync<TPgEntity, TResponse>(
        db: Client | Pool,
        sql: QueryConfig,
        dataMapper: IPgDataMapper<TPgEntity, TResponse>,
    ): Promise<TResponse[]> {
        backendLogger.debug("sql: ", sql);
        const { rows } = await db.query(sql);
        backendLogger.debug("result: ", rows);
        return (rows as TPgEntity[]).map(dataMapper); // we trust db to return correct PgEntity type
    }
}

export type IPgDataMapper<TPgEntity, TResponse> = (
    entity: TPgEntity,
) => TResponse;
