[![Build Status](https://travis-ci.com/merikbest/ecommerce-spring-reactjs.svg?branch=travis-ci-test)](https://travis-ci.com/merikbest/ecommerce-spring-reactjs)
[![codecov](https://codecov.io/gh/merikbest/ecommerce-spring-reactjs/branch/travis-ci-test/graph/badge.svg?token=sEfOfpBHDX)](https://codecov.io/gh/merikbest/ecommerce-spring-reactjs)

# :hibiscus: Perfume webstore

E-commerce project developed using Spring Boot and React.js.<br>

#### An actual version of frontend build deployed to AWS S3 and backend deployed to Heroku:
http://perfume-web.tk <br>
Login: admin@gmail.com <br>
Password: admin

## Used Technologies:

* Back-end: Spring (Boot, Data, Security), JPA / Hibernate, PostgreSQL, JUnit, Mockito
* Front-end: TypeScript, React.js, Redux Toolkit, Ant Design, Jest
* Security: JWT, OAuth2 Google, Facebook, Github
* REST API, GraphQL API
* AWS S3, Heroku
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

1. Install maven: [link](https://www.baeldung.com/install-maven-on-windows-linux-mac)
2. Install Java 8: [link](https://www.oracle.com/ru/java/technologies/javase/javase8-archive-downloads.html)
3. Install Intellij IDEA Ultimate: [link](https://www.jetbrains.com/idea/)
4. Install Postgresql: [link](https://www.postgresql.org/download/)
5. Open pgAdmin and create a new DB (name: perfume and perfumetest) in Postgresql: [link](https://www.guru99.com/postgresql-create-database.html#:~:text=PostgreSQL%20Create%20Database%20using%20pgAdmin)
6. Add Postgresql properties to the application.properties file: [link](https://i.ibb.co/dL77cZS/prop-postgresql.png)
7. Add Lombok and GraphQL plugins to the Intellij IDEA (File/Settings/Plugins)
8. Register new AWS account: [link](https://portal.aws.amazon.com/billing/signup#/start)
9. Create new S3 bucket: [link](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)
10. Change access from private to public in S3 bucket
11. Add public access policy to S3 bucket (!!!important!!! see:
    [doc](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html),
    [github examle](https://stackoverflow.com/questions/58580042/how-to-set-public-read-only-access-on-amazon-s3-bucket#:~:text=To%20make%20objects%20publicly%20accessible%2C%20use%20a%20policy%20like%20this%3A) or
    [my example](https://i.ibb.co/mSpHmyL/12-bucket.jpg ))
12. Get AWS keys: [link](https://supsystic.com/documentation/id-secret-access-key-amazon-s3/) and add to the application.properties file: [link](https://i.ibb.co/FKFKR4n/props-aws.png)
13. Register in gmail
14. Configure reCAPTCHA: [link](https://www.google.com/recaptcha/admin#list), [guide](https://developers.google.com/recaptcha/docs/verify), [video guide (RUS)](https://youtu.be/7cDpbAbhyjc?t=212)
15. Add  reCAPTCHA key to the application.properties file: [link](https://i.ibb.co/nDTP8H5/prop-recaptcha.png) and to [link](https://github.com/merikbest/ecommerce-spring-reactjs/blob/4f74f86500ab9363c04a18412dd432bd913e0477/frontend/src/pages/Registration/Registration.tsx#L134)
16. Add gmail account and password to the application.properties file: [link](https://i.ibb.co/0tRr1Gy/props-gmail.png)
17. Go to [link](https://myaccount.google.com/u/2/lesssecureapps) (important) and change to: “Allow less secure apps: ON”
18. Configure OAuth2: [link](https://console.cloud.google.com/apis/credentials), [guide](https://spring.io/guides/tutorials/spring-boot-oauth2/), [video guide (RUS)](https://www.youtube.com/watch?v=-ohlXEJeRX8&ab_channel=letsCode)
19. Add OAuth2 properties to the application.properties file: [link](https://i.ibb.co/YpH4V3m/oauth2-props.png)
20. Install node.js and npm: [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
21. Now you can run EcommerceApplication (port 8080) and open terminal in client directory and type: npm start
22. Navigate to http://localhost:3000

## Swagger Documentation

https://perfume-websore-api.herokuapp.com/swagger-ui.html <br/>
Or show local: <br/>
http://localhost:8080/swagger-ui.html

## Screenshots

Menu page  |  Product page
:------------------------:|:-------------------------:
![Menu page](https://i.ibb.co/VT4RzYj/1menu.jpg)  |  ![Product page](https://i.ibb.co/HtnKp0W/2-Product-page.jpg)

Cart  |  Ordering
:------------------------:|:-------------------------:
![Email template](https://i.ibb.co/8Y8bfSG/3-Cart.jpg)  |  ![List of users](https://i.ibb.co/tLmY8y2/4-Ordering.jpg)

Email template  |  List of orders
:------------------------:|:-------------------------:
![Email template](https://i.ibb.co/bmKTLPJ/email-template.jpg)  |  ![List of users](https://i.ibb.co/pLTyF25/6-List-of-orders.jpg)

User profile page  |  Add perfume page
:------------------------:|:-------------------------:
![User profile page](https://i.ibb.co/qx1Csc8/7-User-profile-page.jpg)  |  ![Add perfume page](https://i.ibb.co/XbsJPQH/8-Add-perfume-page.jpg)

Edit perfume list  |  Edit perfume page
:------------------------:|:-------------------------:
![Edit perfume list](https://i.ibb.co/HFb9wfR/9-Edit-perfume-list.jpg)  |  ![Edit perfume page](https://i.ibb.co/jH8R8xL/10-Edit-perfume-page.jpg)
