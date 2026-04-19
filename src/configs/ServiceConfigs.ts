import { IClientOrderService } from "../application/services/IClientOrderService.ts";
import { IClientProductService } from "../application/services/IClientProductService.ts";
import { IClientUserService } from "../application/services/IClientUserService.ts";

export interface IServiceConfigs {
    readonly clientOrderService: IClientOrderService;
    readonly clientProductService: IClientProductService;
    readonly clientUserService: IClientUserService;
}
