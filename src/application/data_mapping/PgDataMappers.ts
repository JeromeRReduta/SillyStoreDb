import { IPgProduct } from "../../infrastructure/psql/entities/IPgProduct.ts";
import { IPgUser } from "../../infrastructure/psql/entities/IPgUser.ts";
import { IProductResponse } from "../dtos/responses/IProductResponse.ts";
import { IUserResponse } from "../dtos/responses/IUserResponse.ts";
import { IDataMapper } from "./DataMapper.ts";

const userMapper: IDataMapper<IPgUser, IUserResponse> = ({
    id,
    username,
    email,
}: IPgUser) => {
    return { id, username, email };
};

const productMapper: IDataMapper<IPgProduct, IProductResponse> = ({
    id,
    image_src,
    title,
    description,
    price,
}: IPgProduct) => {
    return { id, imageSrc: image_src, title, description, price };
};

const pgDataMappers = {
    userMapper,
    productMapper,
};

export default pgDataMappers;
