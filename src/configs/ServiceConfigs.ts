import { IClientOrderService } from "../application/services/IOrderClientService.ts";
import { IProductClientService } from "../application/services/IProductClientService.ts";
import { IUserClientService } from "../application/services/IUserClientService.ts";

export interface IServiceConfigs {
    readonly clientOrderService: IClientOrderService;
    readonly clientProductService: IProductClientService;
    readonly clientUserService: IUserClientService;
}
