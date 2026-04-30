import { Client, Pool } from "pg";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import backendConfigs from "./BackendConfigs.ts";
import { IDaoConfigs } from "./DaoConfigs.ts";
import { IRepoConfigs } from "./RepoConfigs.ts";
import { IServiceConfigs } from "./ServiceConfigs.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgCartItemDao.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import OrderRepository from "../domain/repos/OrderRepository.ts";
import ProductRepository from "../domain/repos/ProductRepository.ts";
import UserRepository from "../domain/repos/UserRepository.ts";
import ClientOrderService from "../application/services/ClientOrderService.ts";
import ClientProductService from "../application/services/ClientProductService.ts";
import ClientUserService from "../application/services/ClientUserService.ts";

export interface IApiConfigs {
    readonly db: Client | Pool;
    readonly daos: IDaoConfigs;
    readonly repos: IRepoConfigs;
    readonly services: IServiceConfigs;
}
const db: Client | Pool = new Client(backendConfigs.db.databaseUrl);
const daos: IDaoConfigs = {
    orderDao: new PgOrderDao(db),
    productDao: new PgProductDao(db),
    orderProductDao: new PgOrderProductDao(db),
    userDao: new PgUserDao(db),
};
const repos: IRepoConfigs = {
    orderRepo: new OrderRepository(daos.orderDao, daos.orderProductDao),
    productRepo: new ProductRepository({
        orderProductDao: daos.orderProductDao,
        productDao: daos.productDao,
    }),
    userRepo: new UserRepository(daos.userDao),
};
const services: IServiceConfigs = {
    clientOrderService: new ClientOrderService(repos.orderRepo),
    clientProductService: new ClientProductService(repos.productRepo),
    clientUserService: new ClientUserService(repos.userRepo),
};
const apiConfigs: IApiConfigs = {
    db,
    daos,
    repos,
    services,
};

export default apiConfigs;
