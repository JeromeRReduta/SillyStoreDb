/* eslint-disable @typescript-eslint/no-empty-object-type */ // added so my eyes wouldn't bleed - TODO: remove
import { Client, Pool } from "pg";
import { UserRepository } from "../domain/repos/UserRepository.ts";
import { PgUser } from "../infrastructure/psql/db_entities/PgUser.ts";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import { DataMapper } from "../application/data_mapping/DataMapper.ts";
import { UserResponse } from "../application/dtos/users/UserResponse.ts";
import pgMapper from "../infrastructure/psql/data_mapping/PgMapper.ts";
export interface BackendConfigs<
    // TDbOrder,
    // TDbProduct,
    TDbUser,
    // TDbOrderProduct,
> {
    readonly db: Client | Pool;
    readonly dataMapping: {
        // readonly orderMapper: DataMapper<TDbOrder, OrderResponse>;
        // readonly productMapper: DataMapper<TDbProduct, ProductResponse>;
        readonly userMapper: DataMapper<TDbUser, UserResponse>;
        // readonly orderProductMapper: DataMapper<
        //     TDbOrderProduct,
        //     OrderProductResponse
        // >;
    };
    readonly daos: {
        // readonly orderDao: OrderDao<TDbOrder>;
        // readonly productDao: ProductDao<TDbProduct>;
        readonly userDao: UserDao<TDbUser>;
        // readonly orderProduct: OrderProductDao<TDbOrderProduct>;
    };
    readonly repos: {
        // readonly orderRepo: OrderRepository;
        // readonly productRepo: ProductRepository;
        readonly userRepo: UserRepository;
    };
    readonly handlers: {
        readonly registerUserHandler: RegisterUserHandler;
        // readonly loginUserHandler: LoginUserHandler;
        // readonly getAllProductsHandler: GetAllProductsHandler;
        // readonly getProductByIdHandler: GetProductByIdHandler;
        // readonly getOrdersIncludingProductHandler: GetOrdersIncludingProductHandler;
        // readonly createOrderHandler: CreateOrderHandler;
        // readonly getAllOrdersHandler: GetAllOrdersHandler;
        // readonly getOrderByIdHandler: GetOrderByIdHandler;
        // readonly addProductToOrderHandler: AddProductToOrderHandler;
        // readonly getProductsInOrderHandler: GetProductsInOrderHandler;
    };
}

const backendConfigs: BackendConfigs<// PgOrder,
// PgProduct,
PgUser> =
    // PgOrderProduct
    {
        db: new Client(configs.db.connectionString),
        dataMapping: {
            // orderMapper: undefined,
            // productMapper: undefined,
            userMapper: pgMapper.toUser,
            // orderProductMapper: undefined,
        },
        daos: {
            // orderDao: undefined,
            // productDao: undefined,
            userDao: undefined,
            // orderProduct: undefined,
        },
        repos: {
            // orderRepo: undefined,
            // productRepo: undefined,
            userRepo: undefined,
        },
        handlers: {
            registerUserHandler: undefined,
            // loginUserHandler: undefined,
            // getAllProductsHandler: undefined,
            // getProductByIdHandler: undefined,
            // getOrdersIncludingProductHandler: undefined,
            // createOrderHandler: undefined,
            // getAllOrdersHandler: undefined,
            // getOrderByIdHandler: undefined,
            // addProductToOrderHandler: undefined,
            // getProductsInOrderHandler: undefined,
        },
    };

export default backendConfigs;
