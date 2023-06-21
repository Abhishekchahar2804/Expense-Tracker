const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/user');

router.get('/',userControllers.getHomePage);

router.get('/login',userControllers.getloginPage);

router.post('/sign-up',userControllers.postAddUser);


router.post('/login/login-user',userControllers.postCheckUser)


module.exports=router;