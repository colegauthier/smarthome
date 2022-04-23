CREATE TABLE account (
    id               varchar(500) primary key NOT NULL,
    username         varchar(500),
    firstName        varchar(500),
    lastName         varchar(500),
    password         varchar(500),
    email            citext UNIQUE,
    role             varchar(500)
);