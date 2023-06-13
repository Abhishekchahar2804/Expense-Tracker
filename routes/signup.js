const express = require('express');

const router = express.Router();
const signControllers = require('../controllers/signup');

router.get('/',signControllers.getHomePage);

router.post('/signup',signControllers.postAddUser);


module.exports=router;