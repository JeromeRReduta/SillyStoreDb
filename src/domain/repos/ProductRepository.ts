import {
    ICreateProductRequest,
    IDeleteProductRequest,
    IGetAllProductsRequest,
    IGetProductRequest,
    IProductResponse,
    IUpdateProductRequest,
} from "../../../SillyStoreCommon/dtos/productDtos.ts";
import { IProductDao } from "../../infrastructure/data_access/IProductDao.ts";
import AbstractBaseCrudRepository from "./AbstractBaseCrudRepository.ts";
import { IProductRepository } from "./IProductRepository.ts";

export default class ProductRepository
    extends AbstractBaseCrudRepository<
        ICreateProductRequest,
        IGetAllProductsRequest,
        IGetProductRequest,
        IUpdateProductRequest,
        IDeleteProductRequest,
        IProductResponse
    >
    implements IProductRepository
{
    constructor(dao: IProductDao) {
        super(dao);
    }
}
