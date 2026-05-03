import { Client, Pool, QueryConfig } from "pg";
import {
    ICartItemResponse,
    ICartItemResponseWithCreator,
} from "../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/orderDtos.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos.ts";
import {
    IUserResponse,
    IUserWithPwHashResponse,
} from "../../../SillyStoreCommon/dtos/userDtos.ts";
import backendLogger from "../../configs/BackendLogger.ts";
import { IPgCartItem } from "../psql/entities/IPgCartItem.ts";
import { IPgOrder } from "../psql/entities/IPgOrder.ts";
import { IPgProduct } from "../psql/entities/IPgProduct.ts";
import { IPgUser } from "../psql/entities/IPgUser.ts";

/** Util class for daos using PG's Client or Pool */
export default class PgDaos {
    static userMapper: IPgDataMapper<IPgUser, IUserResponse> = function ({
        id,
        username,
        email,
        role,
    }: IPgUser): IUserResponse {
        return { id, username, email, role };
    };

    static userWithPwHashMapper: IPgDataMapper<
        IPgUser,
        IUserWithPwHashResponse
    > = function (pgUser: IPgUser): IUserWithPwHashResponse {
        return { ...PgDaos.userMapper(pgUser), pwHash: pgUser.pw_hash };
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

    static cartItemMapper: IPgDataMapper<IPgCartItem, ICartItemResponse> =
        function ({
            order_id,
            product_id,
            quantity,
            creator_id,
        }): ICartItemResponse {
            return {
                orderId: order_id,
                productId: product_id,
                quantity,
                creatorId: creator_id,
            };
        };

    static cartItemWithCreatorMapper: IPgDataMapper<
        Required<IPgCartItem>,
        ICartItemResponseWithCreator
    > = function ({
        order_id,
        product_id,
        quantity,
        creator_id,
    }: Required<IPgCartItem>): ICartItemResponseWithCreator {
        return {
            orderId: order_id,
            productId: product_id,
            quantity,
            creatorId: creator_id,
        };
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
