# UserResponse

| Key      | Type                | Description                                                   |
| :------- | :------------------ | :------------------------------------------------------------ |
| id       | number              |                                                               |
| username | string              |                                                               |
| email    | string              |                                                               |
| pwHash   | string              | hashed pw                                                     |
| role     | "client" or "admin" | user's role. This determines which resources they can access. |

# OrderResponse

| Key     | Type                                   | Description                                               |
| :------ | :------------------------------------- | :-------------------------------------------------------- |
| id      | number                                 |                                                           |
| dateStr | string                                 |                                                           |
| userId  | number                                 | creator's id - references a user                          |
| status  | "pending" or "completed" or "canceled" | order status. Each user can only have 1 pending order max |

# ProductResponse

| Key         | Type           | Description |
| :---------- | :------------- | :---------- |
| id          | number         |             |
| title       | string         |             |
| description | string         |             |
| price       | number (money) |             |

# CartItemResponse

| Key       | Type   | Description |
| :-------- | :----- | :---------- |
| orderId   | number |             |
| productId | number |             |
| quantity  | number |             |
