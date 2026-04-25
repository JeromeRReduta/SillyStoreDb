export interface IPgOrder {
    readonly id: number;
    readonly date: string;
    readonly user_id: number;
    readonly status: "pending" | "completed" | "canceled";
}
