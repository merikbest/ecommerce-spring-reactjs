delete from user_role;
delete from usr;

-- password: admin
insert into usr (id, activation_code, password_reset_code, active, email, password, username)
    values (1, null, null, true, 'admin@gmail.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'admin');

-- password: admin
insert into usr (id, activation_code, password_reset_code, active, email, password, username)
    values (122, null, null, true, 'test123@test.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'John');

insert into usr (id, activation_code, password_reset_code, active, email, password, username)
    values (126, '8e97dc37-2cf5-47e2-98e0', '3f9bcdb0-2241-4c34-803e-598b497d571f', false, 'helloworld@test.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'John2');

insert into user_role (user_id, roles) values (1, 'ADMIN');
insert into user_role (user_id, roles) values (122, 'USER');
insert into user_role (user_id, roles) values (126, 'USER');
