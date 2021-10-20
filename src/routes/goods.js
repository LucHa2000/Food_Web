var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const goodsController = require('../app/controllers/GoodsController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get('/:list_id', goodsController.productsFilterPage);
router.get('/', goodsController.index);

module.exports = router;
