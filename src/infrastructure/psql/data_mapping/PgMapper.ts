import { UserResponse } from "../../../application/dtos/users/UserResponse.ts";
import { PgUser } from "../entities/PgUser.ts";

const pgMapper = {
    // toOrder(entity: PgOrder): OrderResponse {},
    // toProduct(entity: PgProduct): ProductResponse {},
    toUser({ id, username, email }: PgUser): UserResponse {
        return { id, username, email };
    },
    // toOrderProduct(entity: PgOrderProduct): OrderProductResponse {},
};

export default pgMapper;
