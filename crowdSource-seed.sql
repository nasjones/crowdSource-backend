INSERT INTO users (username, PASSWORD, first_name, last_name, email, is_admin)
  VALUES ('nascreator', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Nas', 'User', 'nas@nasjones.com', FALSE), ('nasadmin', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Nas', 'Jones', 'nas2@nasjones.com', TRUE), ('nasfunder', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Nas', 'Jones', 'nas3@nasjones.com', FALSE);

INSERT INTO products (title, description, funding)
  VALUES ('Crowd Fight', 'A new trading card game where users can submit a photo of  themselves and be entered into the deck.', 200), ('Cat glass', 'A new glass blowing company where the only thing we make is cats', 50);

INSERT INTO product_creator (username, product_id)
  VALUES ('nascreator', 1), ('nasadmin', 2);

INSERT INTO investments
  VALUES ('nasfunder', 1, 125), ('nasfunder', 2, 10);

