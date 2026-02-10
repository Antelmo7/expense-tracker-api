import * as expensesService from '../services/expensesService.js';
import validateExpense from '../utils/validateExpense.js';

export async function create(req, res) {
  const body = req.body;
  const { userId } = req.user;

  if (!validateExpense(body)) {
    const error = new Error('Missing or incorrect fields');
    error.statusCode = 400;

    throw error;
  }

  const expense = await expensesService.create(userId, body);
  res.status(200).json(expense);
}

export async function update(req, res) {
  const body = req.body;
  const { expenseId } = req.params;
  const { userId } = req.user;

  if (!validateExpense(body)) {
    const error = new Error('Missing or incorrect fields');
    error.statusCode = 400;

    throw error;
  }

  const expense = await expensesService.update(expenseId, userId, body);
  res.status(200).json(expense);
}

export async function deleteExpense(req, res) {
  const { expenseId } = req.params;
  const { userId } = req.user;

  await expensesService.deleteExpense(expenseId, userId);
  res.status(204).json({
    message: 'Expense deleted'
  });
}

export async function get(req, res) {
  const { page = 1, limit = 10, startDate, endDate } = req.query;
  const { userId } = req.user;

  let expenses;
  if (startDate && endDate) {
    expenses = await expensesService.getByDate(userId, parseInt(page), parseInt(limit), startDate, endDate);
  } else {
    expenses = await expensesService.get(userId, parseInt(page), parseInt(limit));
  }

  res.status(200).json(expenses);
}

export async function getLastWeek(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.user;

  const expenses = await expensesService.getLastWeek(userId, parseInt(page), parseInt(limit));
  res.status(200).json(expenses);
}

export async function getLastMonth(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.user;

  const expenses = await expensesService.getLastMonth(userId, parseInt(page), parseInt(limit));
  res.status(200).json(expenses);
}
export async function getLast3Months(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.user;

  const expenses = await expensesService.getLast3Months(userId, parseInt(page), parseInt(limit));
  res.status(200).json(expenses);
}