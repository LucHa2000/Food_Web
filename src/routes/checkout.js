var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const checkoutController = require('../app/controllers/CheckoutController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get('/view', checkoutController.index);
router.post('/order',checkoutController.order);




module.exports = router;