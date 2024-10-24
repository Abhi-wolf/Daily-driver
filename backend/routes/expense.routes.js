import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  getExpensesByMonth,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addExpense);
router.route("/:expenseId").delete(verifyJWT, deleteExpense);
router.route("/:expenseId").patch(verifyJWT, updateExpense);

router.route("/").get(verifyJWT, getExpenses);
router.route("/monthlyExpenses").get(verifyJWT, getExpensesByMonth);

export default router;
