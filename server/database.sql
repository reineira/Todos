CREATE DATABASE todos;

CREATE TABLE todo(
  tid SERIAL PRIMARY KEY,
  description VARCHAR(255),
  status VARCHAR(255)
);