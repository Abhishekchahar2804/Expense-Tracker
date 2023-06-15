const express = require('express');

const router = express.Router();
const purchaseControllers = require('../controllers/purchase');
const authentication = require('../middleware/auth');

router.get('/premiummembership',authentication.authenticated,purchaseControllers.purchasepremium);

router.post('/updatestatus',authentication.authenticated,purchaseControllers.updateOrder)

router.post('/updatefailure',authentication.authenticated,purchaseControllers.updateFailure)


module.exports=router;