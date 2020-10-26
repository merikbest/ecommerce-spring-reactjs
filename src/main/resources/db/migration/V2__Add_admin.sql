insert into usr (id, activation_code, active, email, password, username)
    values (1, null, true, 'merikbest2015@gmail.com', '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', 'admin');

insert into user_role (user_id, roles)
    values (1, 'ADMIN');