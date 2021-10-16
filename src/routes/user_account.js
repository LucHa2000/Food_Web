var express = require('express');
var router = express.Router();
const userAccountController = require('../app/controllers/UserAccountController');
const accountController = require('../app/controllers/AccountController');

router.get('/view', userAccountController.index);
router.get('/view_order', userAccountController.orderPage);
// router.get('/status/:order_status/:id', userAccountController.statusOrder);
router.get('/status/:order_status/:id/user_back', userAccountController.statusBackOrder);
router.get('/status/:order_status/0', userAccountController.cancelOrder);
router.get('/:id', userAccountController.detailOrder);
router.patch('/update/:id/edit', userAccountController.updateAccount);
// router.get('/delete/:id', orderController.orderDelete);
module.exports = router;