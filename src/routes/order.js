var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const orderController = require('../app/controllers/orderController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.get('/status/:order_status/:id', orderController.statusOrder);
router.get('/status/:order_status/:id/back', orderController.statusBackOrder);
router.get('/:id', orderController.detailOrder);
router.get('/delete/:id', orderController.orderDelete);
module.exports = router;