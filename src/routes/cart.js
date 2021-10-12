var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const cartController = require('../app/controllers/CartController');
const cartMiddlewares = require('../app/middlewares/CartMiddlewares');
router.get('/:id',cartController.index)
router.get('/delete/:id',cartController.removeCart)
router.post('/updateQty/:id',cartController.updateQtyCart)
router.get('/',cartController.cartPage)
module.exports = router;