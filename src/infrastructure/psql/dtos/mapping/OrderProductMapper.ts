import { type PgOrderProduct } from "../../entities/PgOrderProduct.ts";
import { type OrderProductResponse } from "../responses/OrderProductResponse.ts";
import { type PgDtoMapper } from "./PgDtoMapper.ts";

const orderProductMapper: PgDtoMapper<PgOrderProduct, OrderProductResponse> = {
    apply({
        order_id,
        product_id,
        quantity,
    }: PgOrderProduct): OrderProductResponse {
        return { orderId: order_id, productId: product_id, quantity };
    },
};

export default orderProductMapper;
