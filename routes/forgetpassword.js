const express = require('express');

const router = express.Router();
const forgetPasswordControllers = require('../controllers/forgetpassword');

router.get('/',forgetPasswordControllers.forgetPassword);
router.post('/forgetpassword',forgetPasswordControllers.postForgetPassword);

module.exports=router;