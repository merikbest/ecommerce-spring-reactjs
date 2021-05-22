[![Build Status](https://travis-ci.com/merikbest/ecommerce-spring-reactjs.svg?branch=travis-ci-test)](https://travis-ci.com/merikbest/ecommerce-spring-reactjs)
[![codecov](https://codecov.io/gh/merikbest/ecommerce-spring-reactjs/branch/travis-ci-test/graph/badge.svg?token=sEfOfpBHDX)](https://codecov.io/gh/merikbest/ecommerce-spring-reactjs)

# :hibiscus: Perfume web store

E-commerce project developed using Spring Boot and React.js.<br>

#### An actual version of build is deployed on AWS:
http://perfumesweb.tk <br>
Login: admin@gmail.com <br> 
Password: admin

## Used Technologies:

* Back-end: Spring (Boot, Data, Security), JPA / Hibernate, PostgreSQL, JUnit, Mockito
* Front-end: TypeScript, React.js, Redux, Jest, Bootstrap, CSS
* Security: JWT, OAuth2 Google, Facebook, Github
* REST API, GraphQL API
* AWS: EC2, S3, PostgreSQL RDS
* Server Build: Maven
* Client Build: npm, yarn, webpack

## Features

* Authentication with JWT and Email validation.
* Authentication with Google, Facebook or Github
* Customers can search for the product according to the specified criteria.
* Customers can add and delete products from the shopping cart.
* Customers can order the products in the shopping cart.
* Customers can change their password and view their orders.
* Admin can add or modify a product.
* Admin can change the data of any user.
* Admin can view orders of all users.

## Installation

1. Install Java 8
2. Install maven 3
3. Install Postgresql
4. Install Lombok and GraphQL plugins in Intellij IDEA
5. Create a new DB (perfume) in Postgresql
6. In file application.properties: <br/>
   6.1 Change your upload path to directory .../ecommerce-spring-reactjs/src/main/resources/uploads (variable upload.path (10 line)) <br/>
   6.2 Type your username and password from your gmail account on 14 and 16 lines. <br/>
   6.3 Go to https://myaccount.google.com/u/2/lesssecureapps and change to: “Allow less secure apps: ON”.
   If you do not change this setting in your Google account, then when sending a message to an email, a 500 server error will occur. <br/>
7. Install node.js
8. Type in console command: npm install (or yarn install)

## Swagger Documentation

http://ec2-3-122-228-86.eu-central-1.compute.amazonaws.com:8080/swagger-ui.html <br/>
Or show local: <br/>
http://localhost:8080/swagger-ui.html

## Screenshots

Menu page  |  Product page
:------------------------:|:-------------------------:
![Menu page](https://i.ibb.co/dcp56tb/menu.jpg)  |  ![Product page](https://i.ibb.co/1dBjdMy/product.jpg)

Email template  |  List of users
:------------------------:|:-------------------------:
![Email template](https://i.ibb.co/bmKTLPJ/email-template.jpg)  |  ![List of users](https://i.ibb.co/T88cFZt/all-users.jpg)

List of orders  |  User order page
:------------------------:|:-------------------------:
![List of orders](https://i.ibb.co/T88cFZt/all-users.jpg)  |  ![User order page](https://i.ibb.co/4f7F0hk/all-orders.jpg)

User profile page  |  Add perfume page
:------------------------:|:-------------------------:
![User profile page](https://i.ibb.co/KDF3FZX/user-page.jpg)  |  ![Add perfume page](https://i.ibb.co/KGKhJxR/add-perfume.jpg)

Edit perfume list  |  Edit perfume page
:------------------------:|:-------------------------:
![Edit perfume list](https://i.ibb.co/fkFSnFy/edit.jpg)  |  ![Edit perfume page](https://i.ibb.co/cTddspr/edit-perfume.jpg)

