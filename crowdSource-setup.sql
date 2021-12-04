CREATE TABLE users (
  username varchar(25) PRIMARY KEY,
  password text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  is_admin boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE products (
  product_id serial PRIMARY KEY,
  title text NOT NULL,
  synopsis char(100),
  description text NOT NULL,
  amount_sought decimal(12, 2) NOT NULL CONSTRAINT positive CHECK (amount_sought > 0)
);

CREATE TABLE product_creator (
  username varchar(25) REFERENCES users ON DELETE CASCADE,
  product_id integer REFERENCES products ON DELETE CASCADE
);

CREATE TABLE investments (
  id serial PRIMARY KEY,
  username varchar(25) REFERENCES users ON DELETE CASCADE,
  product_id integer REFERENCES products ON DELETE CASCADE,
  amount decimal(12, 2) NOT NULL CONSTRAINT positive CHECK (amount > 0)
);

