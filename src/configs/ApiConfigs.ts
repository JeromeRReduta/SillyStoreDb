import { Client, Pool } from "pg";
import PgOrderDao from "../infrastructure/psql/data_access/PgOrderDao.ts";
import backendConfigs from "./BackendConfigs.ts";
import { IDaoConfigs } from "./DaoConfigs.ts";
import { IRepoConfigs } from "./RepoConfigs.ts";
import { IServiceConfigs } from "./ServiceConfigs.ts";
import PgOrderProductDao from "../infrastructure/psql/data_access/PgCartItemDao.ts";
import PgProductDao from "../infrastructure/psql/data_access/PgProductDao.ts";
import PgUserDao from "../infrastructure/psql/data_access/PgUserDao.ts";
import ClientOrderService from "../application/services/ClientOrderService.ts";
import ClientProductService from "../application/services/ClientProductService.ts.OLD";
import ClientUserService from "../application/services/ClientUserService.ts";

export interface IApiConfigs {
    readonly db: Client | Pool;
    readonly daos: IDaoConfigs;
    // readonly services: IServiceConfigs;
}
const db: Client | Pool = new Client(backendConfigs.db.databaseUrl);
const daos: IDaoConfigs = {
    orderDao: new PgOrderDao(db),
    productDao: new PgProductDao(db),
    orderProductDao: new PgOrderProductDao(db),
    userDao: new PgUserDao(db),
};

const apiConfigs: IApiConfigs = {
    db,
    daos,
};

export default apiConfigs;
