delete from orders_order_items;
delete from order_item;
delete from orders;

INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price) VALUES (1, 'Wall street 1', 'New York', '2021-02-06', 'test123@test.com', 'John', 'Doe', '12345678', 123456, 56);

INSERT INTO order_item (id, amount, quantity, perfume_id) VALUES (1, 35, 1, 2);
INSERT INTO order_item (id, amount, quantity, perfume_id) VALUES (2, 21, 1, 4);

INSERT INTO orders_order_items (order_id, order_items_id) VALUES (1, 1);
INSERT INTO orders_order_items (order_id, order_items_id) VALUES (1, 2);

alter sequence hibernate_sequence restart with 200;
