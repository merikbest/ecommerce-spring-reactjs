INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price)
    VALUES (111, 'Wall Street 1', 'New York', '2021-02-06', 'test123@test.com', 'John', 'Doe', '1234567890', 1234567890, 56);

INSERT INTO order_item (id, amount, quantity, perfume_id) VALUES (111, 35, 1, 2);
INSERT INTO order_item (id, amount, quantity, perfume_id) VALUES (222, 21, 1, 4);

INSERT INTO orders_order_items (order_id, order_items_id) VALUES (111, 111);
INSERT INTO orders_order_items (order_id, order_items_id) VALUES (111, 222);
