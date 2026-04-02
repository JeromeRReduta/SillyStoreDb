import { type DbToDomainMapper } from "../../../../SillyStoreCommon/domain-objects/DbToDomainMapper.ts";
import { type Order } from "../../../../SillyStoreCommon/domain-objects/Order.ts";
import { type OrderProduct } from "../../../../SillyStoreCommon/domain-objects/OrderProduct.ts";
import { type Product } from "../../../../SillyStoreCommon/domain-objects/Product.ts";
import { type User } from "../../../../SillyStoreCommon/domain-objects/User.ts";
import { type PgOrder } from "../entities/PgOrder.ts";
import { type PgOrderProduct } from "../entities/PgOrderProduct.ts";
import { type PgProduct } from "../entities/PgProduct.ts";
import { type PgUser } from "../entities/PgUser.ts";

const pgToDomainMapper: DbToDomainMapper<
    PgUser,
    PgOrder,
    PgProduct,
    PgOrderProduct
> = {
    toUser(dbUser: PgUser): User {
        const { id, username, email, pw_hash } = dbUser;
        return {
            id,
            username,
            email,
            pwHash: pw_hash,
        };
    },
    toOrder(dbOrder: PgOrder): Order {
        const { id, date, user_id } = dbOrder;
        return {
            id,
            dateStr: date,
            userId: user_id,
        };
    },
    toProduct(dbProduct: PgProduct): Product {
        const { id, title, description, price, image_src } = dbProduct;
        return {
            id,
            title,
            description,
            price,
            imageSrc: image_src,
        };
    },
    toOrderProduct(dbOrderProduct: PgOrderProduct): OrderProduct {
        const { order_id, product_id, quantity } = dbOrderProduct;
        return {
            orderId: order_id,
            productId: product_id,
            quantity,
        };
    },
};

export default pgToDomainMapper;
