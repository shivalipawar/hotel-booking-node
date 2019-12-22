CREATE DATABASE IF NOT EXISTS hotel;

CREATE TABLE room(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,number int);

create table user(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username varchar(20), email varchar(20));

create table booking(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id int,
check_in long,
check_out long,
room_id int,
foreign key(user_id) references user(id),
foreign key(room_id) references room(id)
);
