var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const cartController = require('../app/controllers/CartController');
const cartMiddlewares = require('../app/middlewares/CartMiddlewares');
router.get('/:id', cartMiddlewares.index, cartController.index);
router.get('/delete/:id', cartController.removeCart);
router.get('/clearAll', cartController.removeAllCart);
router.post(
  '/updateQty/:id',
  cartMiddlewares.index,
  cartController.updateQtyCart,
);
router.get('/', cartMiddlewares.index, cartController.cartPage);
module.exports = router;
