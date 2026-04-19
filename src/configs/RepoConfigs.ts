import { IOrderRepository } from "../domain/repos/IOrderRepository.ts";
import { IProductRepository } from "../domain/repos/IProductRepository.ts";
import { IUserRepository } from "../domain/repos/IUserRepository.ts";

export interface IRepoConfigs {
    readonly orderRepo: IOrderRepository;
    readonly productRepo: IProductRepository;
    readonly userRepo: IUserRepository;
}
