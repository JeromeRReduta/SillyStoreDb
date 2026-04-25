import { IPgProduct } from "./IPgProduct.ts";

export interface IPgProductWithQuantity extends IPgProduct {
    readonly quantity: number;
}
