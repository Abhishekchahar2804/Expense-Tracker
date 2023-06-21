const express = require('express');

const router = express.Router();
const forgetPasswordControllers = require('../controllers/forgetpassword');

router.get('/',forgetPasswordControllers.forgetPassword);
router.post('/forgetpassword',forgetPasswordControllers.postForgetPassword);

router.get('/resetpassword/:id',forgetPasswordControllers.getResetPassword)
router.get('/updatepassword/:id',forgetPasswordControllers.getUpdatePassword)
module.exports=router;