export interface ICreateProductRequest {
    readonly id: number;
    readonly imageSrc: string;
    readonly title: string;
    readonly description: string;
    readonly price: number;
}
