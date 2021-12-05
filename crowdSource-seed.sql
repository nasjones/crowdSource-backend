INSERT INTO users (username, PASSWORD, first_name, last_name, email, is_admin)
  VALUES ('nascreator', '$2b$04$3oTLTJia8ErkqD5oOvhVmeT9FVaE9/9Fl59ugrZGGG.O7WJPPv2ki', 'Nas', 'User', 'nas@nasjones.com', FALSE), ('nasadmin', '$2b$04$3oTLTJia8ErkqD5oOvhVmeT9FVaE9/9Fl59ugrZGGG.O7WJPPv2ki', 'Nas', 'Jones', 'nas2@nasjones.com', TRUE), ('nasfunder', '$2b$04$3oTLTJia8ErkqD5oOvhVmeT9FVaE9/9Fl59ugrZGGG.O7WJPPv2k', 'Nas', 'Jones', 'nas3@nasjones.com', FALSE);

INSERT INTO products (title, description, amount_sought)
  VALUES ('Crowd Fight', 'A new trading card game where users can submit a photo of  themselves and be entered into the deck.', 200), ('Cat glass', 'A new glass blowing company where the only thing we make is cats', 50), ('No Kids TV', 'A new TV thats invisible to children so you never have to share with them', 500000);

INSERT INTO product_creator (username, product_id)
  VALUES ('nascreator', 1), ('nasadmin', 2), ('nasadmin', 3);

-- INSERT INTO investments (username, product_id, amount)
--   VALUES ('nasfunder', 1, 125), ('nasfunder', 2, 10);
