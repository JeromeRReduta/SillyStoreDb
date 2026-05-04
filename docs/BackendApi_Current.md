# /products

/ GET

- returns:
    - on success (always): all products in the db as ProductResponse[]

/:id GET

- returns:
    - on success: product w/ a given id as ProductResponse
    - if no product exists w/ the given id: 404 NOT_FOUND error

# /users

/register POST

- requires:
    - body contains fields: "username" (string), "email" (string), "pw" (string) - returns
    - on success: user token as string
    - if body doesn't contain the required fields: 400 BAD_REQUEST error
- side effects: creates a new user with the given username, email, and hashed version of pw

/login POST

- requires:
    - body contains fields: "email" (string), "pw" (string)
- returns:
    - on success: user token as string
    - if no matching user exists: 404 NOT_FOUND error

# /orders

Note: there is no way to create a pending order from the orders route. This must be
done in the cart route.

(all routes)

- requires:
    - user is signed in (i.e. by using users/login or users/register)
- returns:
    - if user is not signed in: 400 UNAUTHORIZED error
    - (otherwise, continues to next routes)

/ GET

- returns:
    - on success (always): all orders the user owns

/ POST

- requires:
    - body contains fields: dateStr (string), status ("completed" or "pending" or "canceled")
- returns:
    - on success: created OrderResponse
    - if body fields are missing: 400 BAD_REQUEST error
- side effects: creates a new order with the given dateStr, status, and user id as determined by JSON Web Token

/pending GET

- returns:
    - on success: user's pending order as OrderResponse
    - if user has no pending order: 404 NOT_FOUND error

/pending PUT

- requires:
    - body contains fields: dateStr (string), status ("completed" or "pending" or "canceled")
- returns:
    - on success: updated order as OrderResponse
    - if body fields are missing: 400 BAD_REQUEST error
- side effects: updates pending order in db

/:id GET

- returns:
    - on success: order w/ the given id as OrderResponse
    - if no order exists with the given id: 404 NOT_FOUND error
    - if order does exist but is owned by another user: 403 FORBIDDEN error

# /cart

Note: You must use this route to create a pending order. The idea was that there's no
reason to create a pending order unless you were sending items from some new cart
in the frontend site

(all routes)

- requires: user is signed in (i.e. from users/login or users/register)
- returns:
    - if not signed in: 400 UNAUTHORIZED error
    - else, continues to next routes

/pending GET

- returns:
    - on success: cart items in pending order as CartItemResponse[]
    - if user has no pending order: 404 NOT_FOUND error

/pending PUT

- requires:
    - body has fields: cartItems (Array<{productId: number, quantity: number}>)
- returns:
    - on success: empty response
    - if body does not have cartItems: 400 BAD_REQUEST error
- side effects:
    - if pending order exists, _fully overwrites_ all cart items associated with that order
    - if it doesn't exist, this _creates_ a new pending order. This is the only way a pending order is created.
