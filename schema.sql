-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS agency_db;
-- Creates the "blogger" database --
CREATE DATABASE agency_db;

USE agency_db;

DROP TABLE IF EXISTS user;
CREATE TABLE user
(
id int NOT NULL AUTO_INCREMENT,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS vendor;
CREATE TABLE vendor
(
id int NOT NULL AUTO_INCREMENT,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS language;
CREATE TABLE language
(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL UNIQUE,
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS job;
CREATE TABLE job
(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50) NOT NULL,
language_id INT NOT NULL,
user_id INT NOT NULL,
vendor_id INT NULL,
status INT  NOT NULL,
created_on DATETIME NOT NULL DEFAULT NOW(),
modified_on DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (id),
FOREIGN KEY (language_id)
      REFERENCES language(id),
FOREIGN KEY (user_id)
      REFERENCES user(id),
FOREIGN KEY (vendor_id)
      REFERENCES vendor(id)
);