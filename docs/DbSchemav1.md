DB Schema

```
    table users {
        id - serial, primary key
        username - text, not null
        email - text, not null
        pw_hash - text, not null
    }

    table orders {
        id - serial, primary key
        date - Date, not null
        user_id - int, not null
    }

    table products {
        id - serial, primary key
        title - text, not null
        dsecription - text, not null
        price - money, not null
    }

    table orders_products {
        order_id - int, not null, references orders.id (cascades on delete)
        product_id - int, not null, references products.id (cascades on delete)
        quantity - int, not null
        primary key is (order_id, product_id)
    }
```
