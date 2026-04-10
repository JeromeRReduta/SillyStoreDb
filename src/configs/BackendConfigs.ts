// /* eslint-disable @typescript-eslint/no-empty-object-type */ // added so my eyes wouldn't bleed - TODO: remove

import { Client, Pool } from "pg";
import configs from "../../SillyStoreCommon/configs/Configs.ts";
import pgDataMappers from "../application/data_mapping/PgDataMappers.ts";
import ClientProductService from "../application/services/ClientProductService.ts";
import ClientUserService from "../application/services/ClientUserService.ts";
import { IClientProductService } from "../application/services/IClientProductService.ts";
import { IClientUserService } from "../application/services/IClientUserService.ts";
import { IProductRepository } from "../domain/repos/IProductRepository.ts";
import { IUserRepository } from "../domain/repos/IUserRepository.ts";
import ProductRepository from "../domain/repos/ProductRepository.ts";
import UserRepository from "../domain/repos/UserRepository.ts";
import { IOrderProductDao } from "../infrastructure/data_access/IOrderProductDao.ts";
import { IProductDao } from "../infrastructure/data_access/IProductDao.ts";
import { IUserDao } from "../infrastructure/data_access/IUserDao.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgOrderProductDao.ts";
import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import { IOrderRepository } from "../domain/repos/IOrderRepository.ts";
import OrderRepository from "../domain/repos/OrderRepository.ts";
import { IClientOrderService } from "../application/services/IClientOrderService.ts";
import ClientOrderService from "../application/services/ClientOrderService.ts";

// export interface BackendConfigs<
//     // TDbOrder,
//     // TDbProduct,
//     TDbUser,
//     // TDbOrderProduct,
// > {
//     readonly db: Client | Pool;
//     readonly dataMapping: {
//         // readonly orderMapper: DataMapper<TDbOrder, OrderResponse>;
//         // readonly productMapper: DataMapper<TDbProduct, ProductResponse>;
//         readonly userMapper: DataMapper<TDbUser, UserResponse>;
//         // readonly orderProductMapper: DataMapper<
//         //     TDbOrderProduct,
//         //     OrderProductResponse
//         // >;
//     };
//     readonly daos: {
//         // readonly orderDao: OrderDao<TDbOrder>;
//         // readonly productDao: ProductDao<TDbProduct>;
//         readonly userDao: UserDao<TDbUser>;
//         // readonly orderProduct: OrderProductDao<TDbOrderProduct>;
//     };
//     readonly repos: {
//         // readonly orderRepo: OrderRepository;
//         // readonly productRepo: ProductRepository;
//         readonly userRepo: UserRepository;
//     };
//     readonly handlers: {
//         readonly registerUserHandler: RegisterUserHandler;
//         // readonly loginUserHandler: LoginUserHandler;
//         // readonly getAllProductsHandler: GetAllProductsHandler;
//         // readonly getProductByIdHandler: GetProductByIdHandler;
//         // readonly getOrdersIncludingProductHandler: GetOrdersIncludingProductHandler;
//         // readonly createOrderHandler: CreateOrderHandler;
//         // readonly getAllOrdersHandler: GetAllOrdersHandler;
//         // readonly getOrderByIdHandler: GetOrderByIdHandler;
//         // readonly addProductToOrderHandler: AddProductToOrderHandler;
//         // readonly getProductsInOrderHandler: GetProductsInOrderHandler;
//     };
// }

// export const db: Client | Pool = new Client(configs.db.connectionString);

// const dataMapping = {
//     // orderMapper: undefined,
//     // productMapper: undefined,
//     userMapper: PgMapper.toUser,
//     // orderProductMapper: undefined,
// };

// const dataAccess = {
//     userDao: new PgUserDao(db, dataMapping.userMapper),
// };

// const repos = {
//     //             // orderRepo: undefined,
//     //             // productRepo: undefined,
//     userRepo: new SimpleUserRepository(dataAccess.userDao),
// };

// const handlers = {
//     registerUserHandler: undefined,
//     //             // loginUserHandler: undefined,
//     //             // getAllProductsHandler: undefined,
//     //             // getProductByIdHandler: undefined,
//     //             // getOrdersIncludingProductHandler: undefined,
//     //             // createOrderHandler: undefined,
//     //             // getAllOrdersHandler: undefined,
//     //             // getOrderByIdHandler: undefined,
//     //             // addProductToOrderHandler: undefined,
//     //             // getProductsInOrderHandler: undefined,
// };

// // const backendConfigs: BackendConfigs<// PgOrder,
// // // PgProduct,
// // PgUser> =
// //     // PgOrderProduct
// //     {
// //         db: new Client(configs.db.connectionString),

// //         },
// //         daos: {
// //             // orderDao: undefined,
// //             // productDao: undefined,
// //             userDao: new PgUserDao(db, backendConfigs.dataMapping.userMapper),
// //             // orderProduct: undefined,
// //         },
// //         repos: {

// //         },

// //     };

export const db: Client | Pool = new Client(configs.db.connectionString);
const { userMapper, orderMapper, productMapper, orderProductMapper } =
    pgDataMappers;
const pgUserDao: IUserDao = new PgUserDao({
    db,
    dataMapper: userMapper,
});
const userRepo: IUserRepository = new UserRepository(pgUserDao);
const clientUserService: IClientUserService = new ClientUserService(userRepo);
const pgProductDao: IProductDao = new PgProductDao(db, productMapper);
const pgOrderProductDao: IOrderProductDao = new PgOrderProductDao({
    db,
    orderMapper,
    productMapper,
    orderProductMapper,
});
const productRepo: IProductRepository = new ProductRepository({
    orderProductDao: pgOrderProductDao,
    productDao: pgProductDao,
});
const clientProductService: IClientProductService = new ClientProductService(
    productRepo,
);

const pgOrderDao: IOrderDao = new PgOrderDao(db, pgDataMappers.orderMapper);
const orderRepo: IOrderRepository = new OrderRepository(
    pgOrderDao,
    pgOrderProductDao,
);
const clientOrderService: IClientOrderService = new ClientOrderService(
    orderRepo,
);

const services = {
    clientUserService,
    clientProductService,
    clientOrderService,
};

export default services;
