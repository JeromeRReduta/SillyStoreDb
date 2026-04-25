import { IOrderProductResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderProductResponse.ts";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/responses/IOrderResponse.ts";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse.ts";
import { IUserResponse } from "../../../SillyStoreCommon/dtos/responses/IUserResponse.ts";
import { IPgOrder } from "../../infrastructure/psql/entities/IPgOrder.ts";
import { IPgOrderProduct } from "../../infrastructure/psql/entities/IPgOrderProduct.ts";
import { IPgProduct } from "../../infrastructure/psql/entities/IPgProduct.ts";
import { IPgUser } from "../../infrastructure/psql/entities/IPgUser.ts";
import { IDataMapper } from "./DataMapper.ts";

const userMapper: IDataMapper<IPgUser, IUserResponse> = ({
    id,
    username,
    email,
}: IPgUser) => {
    return { id, username, email };
};

const orderMapper: IDataMapper<IPgOrder, IOrderResponse> = ({
    id,
    date,
    user_id,
    status,
}) => {
    return { id, dateStr: date, userId: user_id, status };
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

const orderProductMapper: IDataMapper<
    IPgOrderProduct,
    IOrderProductResponse
> = ({ order_id, product_id, quantity }) => {
    return { orderId: order_id, productId: product_id, quantity };
};

const pgDataMappers = {
    userMapper,
    orderMapper,
    productMapper,
    orderProductMapper,
};

export default pgDataMappers;
