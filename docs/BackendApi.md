# Backend API:

## Relevant Response [DTOs](https://en.wikipedia.org/wiki/Data_transfer_object)

#### Product Response

| Key         | Type   | Description                                      |
| :---------- | :----- | :----------------------------------------------- |
| id          | number | id                                               |
| imageSrc    | string | image url, meant to be put in `<img>` tag as src |
| title       | string | title                                            |
| description | string | description                                      |
| price       | number | price, rounded to 2 decimal pts                  |

---

#### Order Response

| Key     | Type   | Description                            |
| :------ | :----- | :------------------------------------- |
| id      | number | id                                     |
| dateStr | string | date as string, in "YYYY-MM-DD" format |
| userId  | number | id of user that owns this order        |

---

#### OrderProduct Response

| Key       | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| orderId   | number | order id                          |
| productId | number | product id                        |
| quantity  | number | number of units user wants to buy |

---

#### Token Response

It's a string, for JWT bearer token

---

## Users

Certain routes require you to be signed in.

---

### POST /users/register

#### Request body

| Key      | Type   | Description |
| :------- | :----- | :---------- |
| username | string | username    |
| email    | string | email       |
| pw       | string | password    |

#### Responses

| Http Code       | Condition         | Response Body                     |
| :-------------- | :---------------- | :-------------------------------- |
| 201 CREATED     | Success           | TokenResponse (i.e. a jwt string) |
| 400 BAD REQUEST | Malformed request | Error                             |

---

### POST /users/login

#### Request body

| Key      | Type   | Description |
| :------- | :----- | :---------- |
| username | string | username    |
| email    | string | email       |
| pw       | string | password    |

#### Responses

| Http Code        | Condition         | Response Body                     |
| :--------------- | :---------------- | :-------------------------------- |
| 200 OK           | Success           | TokenResponse (i.e. a jwt string) |
| 400 BAD REQUEST  | Malformed request | Error                             |
| 401 UNAUTHORIZED | No matching user  | Error                             |

---

## Products

Items in the database

---

### GET /products

#### Responses

| Http Code | Condition | Response Body     |
| :-------- | :-------- | :---------------- |
| 200 OK    | Success   | ProductResponse[] |

---

### GET /products/:id

#### Path parameters

| Key | Type   | Description |
| :-- | :----- | :---------- |
| id  | number | Product id  |

#### Responses

| Http Code     | Condition                     | Response Body   |
| :------------ | :---------------------------- | :-------------- |
| 200 OK        | Success                       | ProductResponse |
| 404 NOT FOUND | No product w/ given id exists | Error           |

---

### GET /products/:id/orders

Gets the user's orders including the product w/ the given id

#### Authorizations

JWT bearer token

#### Responses

| Http Code     | Condition                     | Response Body   |
| :------------ | :---------------------------- | :-------------- |
| 200 OK        | Success                       | OrderResponse[] |
| 404 NOT FOUND | No product w/ given id exists | Error           |

---

## Orders

Orders. You must be signed in (i.e. have a jwt token) to use any of these routes.

---

### GET /orders

Gets all orders the user has made.

#### Authorizations

JWT bearer token

#### Responses

| Http Code        | Condition     | Response Body   |
| :--------------- | :------------ | :-------------- |
| 200 OK           | Success       | OrderResponse[] |
| 401 UNAUTHORIZED | Not signed in | Error           |

---

### POST /orders

Create an order.

#### Authorizations

JWT bearer token

#### Request body

| Key     | Type   | Description                              |
| :------ | :----- | :--------------------------------------- |
| dateStr | string | date (preferably in "YYYY-MM-DD" format) |

#### Responses

| Http Code        | Condition     | Response Body |
| :--------------- | :------------ | :------------ |
| 201 CREATED      | Success       | OrderResponse |
| 401 UNAUTHORIZED | Not signed in | Error         |

---

### GET /orders/:id

Gets an order w/ a given id. You must be the one who created this order to get it.

#### Authorizations

JWT bearer token

#### Path parameters

| Key | Type   | Description |
| :-- | :----- | :---------- |
| id  | number | Order id    |

#### Responses

| Http Code        | Condition                    | Response Body |
| :--------------- | :--------------------------- | :------------ |
| 200 OK           | Success                      | OrderResponse |
| 401 UNAUTHORIZED | Not signed in                | Error         |
| 403 FORBIDDEN    | Someone else owns this order | Error         |
| 404 NOT FOUND    | No order w/ given id exists  | Error         |

---

### GET /orders/:id/products

Gets all products in this order. Does NOT include quantities.

#### Authorizations

JWT bearer token

#### Path parameters

| Key | Type   | Description |
| :-- | :----- | :---------- |
| id  | number | Order id    |

#### Responses

| Http Code        | Condition                    | Response Body     |
| :--------------- | :--------------------------- | :---------------- |
| 200 OK           | Success                      | ProductResponse[] |
| 401 UNAUTHORIZED | Not signed in                | Error             |
| 403 FORBIDDEN    | Someone else owns this order | Error             |
| 404 NOT FOUND    | No order w/ given id exists  | Error             |

---

### POST /orders/:id/products

Adds a product to an order.

#### Authorizations

JWT bearer token

#### Path parameters

| Key | Type   | Description |
| :-- | :----- | :---------- |
| id  | number | Order id    |

#### Request body

| Key       | Type   | Description                    |
| :-------- | :----- | :----------------------------- |
| orderId   | number | order id                       |
| productId | number | product id                     |
| quantity  | number | how many units you want to buy |

#### Responses

| Http Code        | Condition                                     | Response Body        |
| :--------------- | :-------------------------------------------- | :------------------- |
| 201 CREATED      | Success                                       | OrderProductResponse |
| 400 BAD REQUEST  | Bad request, or no product w/ given id exists | Error                |
| 401 UNAUTHORIZED | Not signed in                                 | Error                |
| 403 FORBIDDEN    | Someone else owns this order                  | Error                |
| 404 NOT FOUND    | No order w/ given id exists                   | Error                |

---

### GET /orders/:id/cart

Same as GET /orders/:id/products, but includes product quantities

#### Authorizations

JWT bearer token

#### Path parameters

| Key | Type   | Description |
| :-- | :----- | :---------- |
| id  | number | Order id    |

#### Responses

| Http Code        | Condition                    | Response Body                            |
| :--------------- | :--------------------------- | :--------------------------------------- |
| 200 OK           | Success                      | (ProductResponse & {quantity: number})[] |
| 401 UNAUTHORIZED | Not signed in                | Error                                    |
| 403 FORBIDDEN    | Someone else owns this order | Error                                    |
| 404 NOT FOUND    | No order w/ given id exists  | Error                                    |
