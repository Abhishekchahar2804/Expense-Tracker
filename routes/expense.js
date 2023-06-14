const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/',expenseController.getHomePage);

router.post('/add-expense',expenseController.postAddExpense);

router.get('/expenses/load-data', expenseController.sendExpenses);

router.delete('/delete-expense/:id',expenseController.deleteExpense);

// router.put('/update-expense/:id',expenseController.updateExpense);

module.exports=router;
