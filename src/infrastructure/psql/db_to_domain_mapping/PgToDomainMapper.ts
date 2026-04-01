import { type DbToDomainMapper } from "../../../../SillyStoreCommon/domain-objects/DbToDomainMapper.ts";
// export interface DbToDomainMapper {
//     toUser<TDbUser>(dbUser: TDbUser): User;
//     toOrder<TDbOrder>(dbOrder: TDbOrder): Order;
//     toProduct<TDbProduct>(dbProduct: TDbProduct): Product;
//     toOrderProduct<TOrderProduct>(dbOrderProduct: TOrderProduct): OrderProduct;
// }

const pgToDomainMapper: DbToDomainMapper = {
    toUser: function <TDbUser>(dbUser: TDbUser): User {
        throw new Error("Function not implemented.");
    },
    toOrder: function <TDbOrder>(dbOrder: TDbOrder): Order {
        throw new Error("Function not implemented.");
    },
    toProduct: function <TDbProduct>(dbProduct: TDbProduct): Product {
        throw new Error("Function not implemented.");
    },
    toOrderProduct: function <TOrderProduct>(
        dbOrderProduct: TOrderProduct,
    ): OrderProduct {
        throw new Error("Function not implemented.");
    },
};

export default pgToDomainMapper;
