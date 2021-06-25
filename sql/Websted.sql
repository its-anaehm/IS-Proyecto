DROP DATABASE IF EXISTS Websted ;
CREATE DATABASE Websted CHARACTER SET utf8;

USE Websted;

CREATE TABLE User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    txt_email VARCHAR(50) UNIQUE NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    txt_password VARCHAR(150) NOT NULL
);


