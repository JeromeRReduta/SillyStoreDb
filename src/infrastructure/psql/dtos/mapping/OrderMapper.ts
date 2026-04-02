import { type PgOrder } from "../../entities/PgOrder.ts";
import { type OrderResponse } from "../responses/OrderResponse.ts";
import { type PgDtoMapper } from "./PgDtoMapper.ts";

const orderMapper: PgDtoMapper<PgOrder, OrderResponse> = {
    apply({ id, date, user_id }: PgOrder): OrderResponse {
        return { id, dateStr: date, userId: user_id };
    },
};

export default orderMapper;
