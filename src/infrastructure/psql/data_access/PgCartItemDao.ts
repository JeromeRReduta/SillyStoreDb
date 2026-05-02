import PG, { Client, Pool, QueryConfig } from "pg";
import { ICartItemDao } from "../../data_access/ICartItemDao.ts";
import { ICartItem } from "../../../../SillyStoreCommon/domain-objects/CartItem.ts";
import {
    IGetPendingCartItemsRequest,
    ICartItemResponse,
    IMergeCartItemsInOrderRequest,
    IMergePendingCartItemsRequest,
    IGetAllCartItemsRequest,
    IGetCartItemRequest,
    IUpdateCartItemRequest,
    IDeleteCartItemRequest,
    ICreateCartItemRequest,
    IGetCartItemsInOrderRequest,
} from "../../../../SillyStoreCommon/dtos/cartItemDtos.ts";
import PgDaos from "../../data_access/PgDaos.ts";
import { IOrderResponse } from "../../../../SillyStoreCommon/dtos/orderDtos.ts";
import backendLogger from "../../../configs/BackendLogger.ts";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class PgCartItemDao implements ICartItemDao {
    private db: Client | Pool;
    private formattedOrderSql: string;

    constructor(db: Client | Pool) {
        this.db = db;
        this.formattedOrderSql = `
            id,
            TO_CHAR(date, 'yyyy-mm-dd') AS date,
            user_id,
            status
        `;
    }

    async createAsync({
        orderId,
        productId,
        quantity,
    }: ICreateCartItemRequest): Promise<ICartItem> {
        const sql: QueryConfig = {
            text: `
                INSERT INTO cart_items (order_id, product_id, quantity)

                VALUES ($1, $2, $3)
                ON CONFLICT (order_id, product_id) DO UPDATE
                    SET quantity = $3
                RETURNING *
            `,
            values: [orderId, productId, quantity],
        };
        const rows: ICartItemResponse[] = await PgDaos.queryAsync(
            this.db,
            sql,
            PgDaos.cartItemMapper,
        );
        if (rows.length !== 1) {
            throw Error(
                "error - create should return exactly 1 entry but returned " +
                    rows.length,
            );
        }
        return rows[0];
    }
    async getAllAsync(dto: IGetAllCartItemsRequest): Promise<ICartItem[]> {
        throw new Error("Method not implemented.");
    }
    async getAsync(dto: IGetCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }
    async updateAsync(dto: IUpdateCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }
    async deleteAsync(dto: IDeleteCartItemRequest): Promise<ICartItem | null> {
        throw new Error("Method not implemented.");
    }
    async getAllPendingAsync({
        creatorId,
    }: IGetPendingCartItemsRequest): Promise<ICartItemResponse[]> {
        const sql: QueryConfig = {
            text: `
                WITH cart_items_with_creators AS (
                    SELECT * FROM cart_items AS c
                    JOIN orders AS o
                        ON o.id = c.order_id
                )

                SELECT * from cart_items_with_creators AS result
                    WHERE result.status = 'pending'
                        AND result.user_id = $1
            `,
            values: [creatorId],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.cartItemMapper);
    }

    async getAllInOrderAsync({
        creatorId,
        orderId,
    }: IGetCartItemsInOrderRequest): Promise<ICartItemResponse[]> {
        const sql: QueryConfig = {
            text: `
                WITH cart_items_with_creators AS (
                    SELECT * FROM cart_items AS c
                    JOIN orders AS o
                        ON o.id = c.order_id
                )

                SELECT * from cart_items_with_creators AS result
                    WHERE result.status = 'pending'
                        AND result.user_id = $1
                        AND result.order_id = $2
            `,
            values: [creatorId, orderId],
        };
        return await PgDaos.queryAsync(this.db, sql, PgDaos.cartItemMapper);
    }

    async mergeCartInOrderAsync(
        dto: IMergeCartItemsInOrderRequest,
    ): Promise<ICartItemResponse[]> {
        throw new Error("Method not implemented.");
    }
    async mergePendingCartAsync({
        creatorId,
        cartItems,
    }: IMergePendingCartItemsRequest): Promise<ICartItemResponse[]> {
        await this.db.query({
            text: `
            INSERT into orders (date, status, user_id)
            VALUES (CURRENT_DATE, 'pending', $1)
            ON CONFLICT
                DO NOTHING
            RETURNING ${this.formattedOrderSql}
            `,
            values: [creatorId],
        });
        const getIdSql: QueryConfig = {
            text: `
                SELECT DISTINCT id FROM orders
                WHERE status = 'pending'
                    AND user_id = $1
            `,
            values: [creatorId],
        };
        const idRows: number[] = await PgDaos.queryAsync(
            this.db,
            getIdSql,
            (e: { id: number }) => e.id,
        );
        if (idRows.length !== 1) {
            throw new Error(
                "idk what happened but the sql messed up here - should always return 1",
            );
        }
        const pendingOrderId: number = idRows[0];
        await this.db.query(
            `CREATE TEMP TABLE cart_items_new (LIKE cart_items)`,
        );
        await this.db.query({
            text: `
                WITH objs AS 
                   (
                        SELECT *
                        FROM json_to_recordset($2)
                        AS x("productId" INT, "quantity" INT)
                    )
                INSERT INTO cart_items_new (order_id, product_id, quantity)
                SELECT $1::int AS order_id, "productId", quantity FROM
                    objs
                RETURNING *
            `,
            values: [pendingOrderId, JSON.stringify(cartItems)],
        });
        // ty https://stackoverflow.com/questions/52315874/how-to-correct-migrate-merge-statement-with-not-matched-by-target-from-ms-sq
        // ty https://stackoverflow.com/questions/35159431/on-conflict-do-update-has-missing-from-clause
        await this.db.query({
            text: `
                WITH upsert(order_id, product_id) AS (
                    INSERT INTO cart_items (order_id, product_id, quantity)
                    SELECT order_id, product_id, quantity FROM cart_items_new
                    ON CONFLICT (order_id, product_id)
                        DO UPDATE SET
                            quantity = excluded.quantity
                    RETURNING order_id, product_id
                )
                DELETE FROM cart_items
                    WHERE order_id = $1
                    AND product_id NOT IN (SELECT product_id FROM upsert)

            `,
            values: [pendingOrderId],
        });
        await this.db.query("DROP TABLE cart_items_new");
        return [];
    }

    // async createAsync({
    //     orderId,
    //     productId,
    //     quantity,
    // }: ICartItem): Promise<ICartItem> {
    //     const sql: QueryConfig = {
    //         text: `
    //             INSERT INTO cart_items (order_id, product_id, quantity)
    //             VALUES ($1, $2, $3)
    //             RETURNING *
    //         `,
    //         values: [orderId, productId, quantity],
    //     };
    //     const rows: ICartItemResponse[] = await PgDaos.queryAsync(
    //         this.db,
    //         sql,
    //         PgDaos.orderProductMapper, // TODO - change to cartitemresponse mapper
    //     );
    //     if (rows.length !== 1) {
    //         throw new Error("Error - only 1 entry should have been created!");
    //     }
    //     return rows[0];
    // }
    // async getAllAsync(_dto: IGetAllCartItemsRequest): Promise<ICartItem[]> {
    //     throw new Error("Method not implemented.");
    // }
    // async getAsync(_dto: IGetCartItemRequest): Promise<ICartItem | null> {
    //     throw new Error("Method not implemented.");
    // }
    // async updateAsync(_dto: IUpdateCartItemRequest): Promise<ICartItem | null> {
    //     throw new Error("Method not implemented.");
    // }
    // async deleteAsync(_dto: IDeleteCartItemRequest): Promise<ICartItem | null> {
    //     throw new Error("Method not implemented.");
    // }

    // async getAllPendingCartItemsAsync(
    //     dto: IGetPendingCartItemsRequest,
    // ): Promise<IProductWithQuantityResponse[]> {
    //     throw new Error("Method not implemented.");
    // }
    // async mergeCartItemsAsync(
    //     dto: IMergeCartItemsRequest,
    // ): Promise<ICartItemResponse[]> {
    //     throw new Error("Method not implemented.");
    // }
    // async mergePendingCartItemsAsync(
    //     dto: IMergePendingCartItemsRequest,
    // ): Promise<ICartItemResponse[]> {
    //     throw new Error("Method not implemented.");
    // }

    // async getOrdersIncludingProductAsync({
    //     productId,
    //     creatorId,
    //     role,
    // }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
    //     const isInvalid: boolean = role === "client" && creatorId === undefined;
    //     if (isInvalid) {
    //         throw new HttpError(
    //             400,
    //             "Bad request - need to either be admin or provide a creator id!",
    //         );
    //     }
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT ${this.formattedOrderSql} FROM cart_items AS c
    //             JOIN orders AS o
    //                 ON c.order_id = o.id
    //             WHERE c.product_id = $1
    //                 ${role === "client" ? "AND creator_id = $2" : ""}
    //         `,
    //         values: role === "client" ? [productId, creatorId] : [productId],
    //     };
    //     return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    // }
    // async getOrdersIncludingProductAsync({
    //     productId,
    //     userId,
    // }: IGetOrdersIncludingProductRequest): Promise<IOrderResponse[]> {
    //     const isClient: boolean = userId !== null;
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT o.* FROM orders_products AS op
    //             JOIN orders AS o
    //                 ON op.order_id = o.id
    //             WHERE op.product_id = $1
    //                 ${isClient ? "AND user_id = $2" : ""}
    //         `,
    //         values: isClient ? [productId, userId] : [productId],
    //     };
    //     return await PgDaos.queryAsync(this.db, sql, PgDaos.orderMapper);
    // }

    // async getProductsInOrderAsync({
    //     orderId,
    // }: IGetProductsInOrderRequest): Promise<IProductResponse[]> {
    //     const sql: QueryConfig = {
    //         text: `
    //         SELECT p.* FROM orders_products AS op
    //         JOIN products AS p
    //             ON op.product_id = p.id
    //         WHERE op.order_id = $1
    //     `,
    //         values: [orderId],
    //     };
    //     return await PgDaos.queryAsync(this.db, sql, PgDaos.productMapper);
    // }

    // async getProductsWithQuantitiesInPendingOrderAsync({
    //     userId,
    // }: IGetProductsInOrderRequest): Promise<IProductWithQuantityResponse[]> {
    //     const isClient: boolean = userId !== null;
    //     const sql: QueryConfig = {
    //         text: `
    //             SELECT p.*, op.quantity FROM orders_products AS op
    //             JOIN products AS p
    //                 ON op.product_id = p.id
    //             JOIN orders AS o
    //                 ON op.order_id = o.id
    //             WHERE o.status = 'pending'
    //                 ${isClient ? "AND o.user_id = $1" : ""}
    //         `,
    //         values: isClient ? [userId] : [],
    //     };
    //     return await PgDaos.queryAsync(
    //         this.db,
    //         sql,
    //         PgDaos.productWithQuantityMapper,
    //     );
    // }
}
