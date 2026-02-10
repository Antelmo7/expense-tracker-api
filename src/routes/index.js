import { Router } from "express";
import authenticateToken from '../middlewares/auth.js';
import authRouter from './auth.js';
import expensesRouter from './expenses.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/expenses', authenticateToken, expensesRouter);

export default router;