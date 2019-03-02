DROP DATABASE IF EXISTS atw80db;
CREATE DATABASE atw80db;

USE atw80db;


CREATE TABLE products
(
id int NOT NULL AUTO_INCREMENT,
sku varchar(10) NOT NULL,
product_name varchar(100) NOT NULL,
product_desc varchar(200) NOT NULL,
country varchar(50) NOT NULL,
product_image varchar(200) NOT NULL,
price DECIMAL (5,2),
PRIMARY KEY (id)
);

CREATE TABLE members
(
id int NOT NULL AUTO_INCREMENT,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(50) NOT NULL,
address_1 varchar(50) NOT NULL,
address_2 varchar(50),
city varchar(30) NOT NULL,
state varchar (2) NOT NULL,
zip_code varchar(5) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE carts
(
    id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    date_purchased DATETIME,
    PRIMARY KEY (id)
);


CREATE TABLE cart_contents
(
    id INT NOT NULL AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DATETIME,
    PRIMARY KEY (id)
);
