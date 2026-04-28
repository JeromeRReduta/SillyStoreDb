import { IOrderDao } from "../infrastructure/data_access/IOrderDao.ts";
import { IOrderProductDao } from "../infrastructure/data_access/ICartItemDao.ts";
import { IProductDao } from "../infrastructure/data_access/IProductDao.ts";
import { IUserDao } from "../infrastructure/data_access/IUserDao.ts";

export interface IDaoConfigs {
    readonly orderDao: IOrderDao;
    readonly productDao: IProductDao;
    readonly userDao: IUserDao;
    readonly orderProductDao: IOrderProductDao;
}
