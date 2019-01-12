drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(255) NULL,
 department_name VARCHAR(255) NULL,
 price float NULL,
 stock_quantity float NULL,
 primary key(item_id)
 );
 
 insert into products(product_name,department_name,price,stock_quantity)
 VALUES('Hat','Clothing',4,10),
 ('Shirt','Clothing',8,10),
 ('Pants','Clothing',7,10),
 ('Toothbrush','Health',1,10),
 ('Toothpaste','Health',0.5,10),
 ('Comb','Beauty',1.5,10),
 ('Cotton Swab','Beauty',2.1,10),
 ('Soap','Beauty',0.6,10),
 ('Shampoo','Beauty',0.8,10),
 ('Towel','Domestics',15,10)