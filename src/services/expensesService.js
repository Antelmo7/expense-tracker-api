import { Client } from "pg";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

await client.connect();

export async function create(userId, {
  description,
  amount,
  category,
}) {
  const text = `INSERT INTO expenses (description, amount, category, userId) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [description, parseFloat(amount).toFixed(2), category, userId];

  const res = await client.query(text, values);
  const expense = res.rows[0];

  return expense;
}

export async function update(expenseId, userId, {
  description,
  amount,
  category,
}) {
  const textToValidate = `SELECT * FROM expenses WHERE expenseId = $1 AND userId = $2`;
  const valuesToValidate = [expenseId, userId];

  const resToValidate = await client.query(textToValidate, valuesToValidate);

  if (resToValidate.rowCount === 0) {
    const error = new Error('Expense not found');
    error.statusCode === 400;

    throw error;
  }

  const text = `UPDATE expenses SET description = $1, amount = $2, category = $3 RETURNING *`;
  const values = [description, parseFloat(amount).toFixed(2), category];

  const res = await client.query(text, values);
  const expense = res.rows[0];

  return expense;
}

export async function deleteExpense(expenseId, userId) {
  const textToValidate = `SELECT * FROM expenses WHERE expenseId = $1 AND userId = $2`;
  const valuesToValidate = [expenseId, userId];

  const resToValidate = await client.query(textToValidate, valuesToValidate);

  if (resToValidate.rowCount === 0) {
    const error = new Error('Expense not found');
    error.statusCode === 400;

    throw error;
  }

  const text = `DELETE FROM expenses WHERE expenseId = $1`;
  const values = [expenseId];

  const res = await client.query(text, values);

  return true;
}

export async function get(userId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const text = `SELECT * FROM expenses WHERE userId = $1 LIMIT $2 OFFSET $3`;
  const values = [userId, limit, offset];

  const res = await client.query(text, values);

  const countText = `SELECT count(*) FROM expenses WHERE userId = $1`;
  const countValues = [userId];

  const countRes = await client.query(countText, countValues);

  const pageItems = res.rowCount;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: res.rows,
    page,
    pageItems,
    totalItems,
    totalPages
  }
}

export async function getLastWeek(userId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const text = `SELECT * FROM expenses WHERE userId = $1 AND createdAt > $2 LIMIT $3 OFFSET $4`;
  const values = [userId, sevenDaysAgo.toISOString(), limit, offset];

  const res = await client.query(text, values);

  const countText = `SELECT count(*) FROM expenses WHERE userId = $1 AND createdAt > $2`;
  const countValues = [userId, sevenDaysAgo];

  const countRes = await client.query(countText, countValues);

  const pageItems = res.rowCount;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: res.rows,
    page,
    pageItems,
    totalItems,
    totalPages
  }
}

export async function getLastMonth(userId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
  console.log(oneMonthAgo);

  const text = `SELECT * FROM expenses WHERE userId = $1 AND createdAt > $2 LIMIT $3 OFFSET $4`;
  const values = [userId, oneMonthAgo.toISOString(), limit, offset];

  const res = await client.query(text, values);

  const countText = `SELECT count(*) FROM expenses WHERE userId = $1 AND createdAt > $2`;
  const countValues = [userId, oneMonthAgo];

  const countRes = await client.query(countText, countValues);

  const pageItems = res.rowCount;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: res.rows,
    page,
    pageItems,
    totalItems,
    totalPages
  }
}

export async function getLast3Months(userId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 93);
  console.log(oneMonthAgo);

  const text = `SELECT * FROM expenses WHERE userId = $1 AND createdAt > $2 LIMIT $3 OFFSET $4`;
  const values = [userId, oneMonthAgo.toISOString(), limit, offset];

  const res = await client.query(text, values);

  const countText = `SELECT count(*) FROM expenses WHERE userId = $1 AND createdAt > $2`;
  const countValues = [userId, oneMonthAgo];

  const countRes = await client.query(countText, countValues);

  const pageItems = res.rowCount;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: res.rows,
    page,
    pageItems,
    totalItems,
    totalPages
  }
}

export async function getByDate(userId, page = 1, limit = 10, startDate, endDate) {
  const offset = (page - 1) * limit;

  const text = `SELECT * FROM expenses WHERE userId = $1 AND createdAt BETWEEN $2 AND $3 LIMIT $4 OFFSET $5`;
  const values = [userId, startDate, endDate, limit, offset];

  const res = await client.query(text, values);

  const countText = `SELECT count(*) FROM expenses WHERE userId = $1 AND createdAt BETWEEN $2 AND $3`;
  const countValues = [userId, startDate, endDate];

  const countRes = await client.query(countText, countValues);

  const pageItems = res.rowCount;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: res.rows,
    page,
    pageItems,
    totalItems,
    totalPages
  }
}