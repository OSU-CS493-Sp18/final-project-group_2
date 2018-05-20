create database db;
use db;

create table jokes (
    id int auto_increment primary key,
    joke text not null,
    dadRating int not null,
    user text not null,
    keywords text not null
);

create table users (
    id int auto_increment primary key,
    username text not null,
    pass text not null,
    email text not null,
    dadRating int not null,
);