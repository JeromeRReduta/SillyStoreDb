/* eslint-disable @typescript-eslint/no-empty-object-type */ // added so my eyes wouldn't bleed - TODO: remove
import { Client, Pool } from "pg";
import { UserRepository } from "../domain/repos/UserRepository.ts";
import { PgUser } from "../infrastructure/psql/db_entities/PgUser.ts";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import { DataMapper } from "../application/data_mapping/DataMapper.ts";
import { UserResponse } from "../application/dtos/users/UserResponse.ts";
import PgMapper from "../infrastructure/psql/data_mapping/PgMapper.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import PgUserRepository from "../infrastructure/psql/repositories/PgUserRepository.ts";
import SimpleUserRepository from "../domain/repos/SimpleUserRepository.ts";

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

export const db: Client | Pool = new Client(configs.db.connectionString);

const dataMapping = {
    // orderMapper: undefined,
    // productMapper: undefined,
    userMapper: PgMapper.toUser,
    // orderProductMapper: undefined,
};

const dataAccess = {
    userDao: new PgUserDao(db, dataMapping.userMapper),
};

const repos = {
    //             // orderRepo: undefined,
    //             // productRepo: undefined,
    userRepo: new SimpleUserRepository(dataAccess.userDao),
};

const handlers = {
    registerUserHandler: undefined,
    //             // loginUserHandler: undefined,
    //             // getAllProductsHandler: undefined,
    //             // getProductByIdHandler: undefined,
    //             // getOrdersIncludingProductHandler: undefined,
    //             // createOrderHandler: undefined,
    //             // getAllOrdersHandler: undefined,
    //             // getOrderByIdHandler: undefined,
    //             // addProductToOrderHandler: undefined,
    //             // getProductsInOrderHandler: undefined,
};

// const backendConfigs: BackendConfigs<// PgOrder,
// // PgProduct,
// PgUser> =
//     // PgOrderProduct
//     {
//         db: new Client(configs.db.connectionString),

//         },
//         daos: {
//             // orderDao: undefined,
//             // productDao: undefined,
//             userDao: new PgUserDao(db, backendConfigs.dataMapping.userMapper),
//             // orderProduct: undefined,
//         },
//         repos: {

//         },

//     };
