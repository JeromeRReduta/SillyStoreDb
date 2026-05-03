import { IOrder } from "../../../../SillyStoreCommon/domain-objects/Order.ts";

export interface IPgOrder {
    readonly id: IOrder["id"];
    readonly date: IOrder["dateStr"];
    readonly user_id: IOrder["userId"];
    readonly status: IOrder["status"];
}
