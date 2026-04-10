export interface ICreateOrderRequest {
    readonly dateStr: string;
    readonly userId: number; // even if you're an admin you need to add your id here
}
