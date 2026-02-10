import * as expenseController from '../controllers/expensesController.js';
import { Router } from "express";
const router = Router();

router.post('/', expenseController.create);
router.patch('/:expenseId', expenseController.update);
router.delete('/:expenseId', expenseController.deleteExpense);
router.get('/', expenseController.get);
router.get('/pastweek', expenseController.getLastWeek);
router.get('/pastmonth', expenseController.getLastMonth);
router.get('/past3months', expenseController.getLast3Months);

export default router;