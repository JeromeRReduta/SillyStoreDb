DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders_products;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    pw_hash TEXT NOT NULL
);

DROP TYPE IF EXISTS order_status;
CREATE TYPE order_status AS ENUM('pending', 'completed', 'canceled');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    status order_status NOT NULL DEFAULT 'pending'
);

DROP INDEX IF EXISTS pending_order;
CREATE UNIQUE INDEX pending_order
ON orders (user_id)
WHERE status = 'pending';

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price MONEY NOT NULL -- price amount w/ 2 decimals, but as large as we can before we get to 2^32 - 1 or 4-byte int max

);

CREATE TABLE orders_products (
    order_id INT NOT NULL REFERENCES orders ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products ON DELETE CASCADE,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);