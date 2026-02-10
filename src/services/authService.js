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

export async function register({
  name,
  email,
  password
}) {
  try {
    const passHash = bcrypt.hashSync(password, 10)
    const text = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, passHash];

    const res = await client.query(text, values);
    const user = res.rows[0];

    const payload = {
      userId: user.userid
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30 days'
    });

    return token;
  } catch (error) {
    error.message = error.message === 'duplicate key value violates unique constraint \"users_email_key\"' && 'Email already in use';
    error.statusCode = 400;

    throw error;
  }
}

export async function login({
  email,
  password
}) {
  const text = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  const res = await client.query(text, values);
  const user = res.rows[0];

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 400;

    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error('Invalid credentials');
    error.statusCode = 400;

    throw error;
  }

  const payload = {
    userId: user.userid
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30 days'
  });

  return token;
}