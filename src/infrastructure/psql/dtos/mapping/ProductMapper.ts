import { type PgProduct } from "../../entities/PgProduct.ts";
import { type ProductResponse } from "../responses/ProductResponse.ts";
import { type PgDtoMapper } from "./PgDtoMapper.ts";

const productMapper: PgDtoMapper<PgProduct, ProductResponse> = {
    apply({
        id,
        title,
        description,
        price,
        image_src,
    }: PgProduct): ProductResponse {
        return { id, title, description, price, imageSrc: image_src };
    },
};
