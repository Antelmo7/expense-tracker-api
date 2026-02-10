CREATE TABLE IF NOT EXISTS users (
	userId SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password text not null,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE expenseCategory AS ENUM ('Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others');

CREATE TABLE IF NOT EXISTS expenses (
	expenseId SERIAL PRIMARY KEY,
	description VARCHAR(256) NOT NULL,
	amount FLOAT(2) NOT NULL,
	category expenseCategory default 'Others',
	userId INT REFERENCES users(userId),
	createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);