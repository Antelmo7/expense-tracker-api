import * as authService from '../services/authService.js';
import validateUser from '../utils/validateUser.js';

export async function register(req, res) {
  const body = req.body;

  if (!validateUser(body)) {
    const error = new Error('Missing or incorrect fields');
    error.statusCode = 400;

    throw error;
  }

  const token = await authService.register(body);
  res.status(201).json({ token });
}

export async function login(req, res) {
  const body = req.body;

  if (!validateUser(body, ['email', 'password'])) {
    const error = new Error('Missing or incorrect fields');
    error.statusCode = 400;

    throw error;
  }

  const token = await authService.login(body);
  res.status(201).json({ token });
}