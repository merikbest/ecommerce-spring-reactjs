-- password: admin
insert into usr (id, activation_code, password_reset_code, active, email, password, username, provider)
    values (1, null, null, true, 'admin@gmail.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'admin', 'LOCAL');

-- password: admin
insert into usr (id, activation_code, password_reset_code, active, email, password, username, provider)
    values (122, null, null, true, 'test123@test.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'John', 'LOCAL');

insert into user_role (user_id, roles)
    values (1, 'ADMIN');

insert into user_role (user_id, roles)
    values (122, 'USER');
