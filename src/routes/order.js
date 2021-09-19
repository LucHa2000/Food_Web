var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const OrderController = require('../app/controllers/orderController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.get('/status/:order_status/:id', OrderController.statusOrder);
router.get('/detail/:id', OrderController.detailOrder);
module.exports = router;