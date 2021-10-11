var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const adminController = require('../app/controllers/AdminController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.get('/article', adminController.articlePage);
router.get('/review', adminController.reviewPage);
router.get('/promotion', adminController.promotionPage);
router.get('/account', adminController.accountPage);
router.get('/product', adminController.index);
router.get('/list', adminController.listPage);
router.get('/order', adminController.orderPage);
router.get('/:id', adminController.updateProductPage);
router.post(
  '/productStore',
  upload.single('image'),
  adminController.productStore,
);

router.get('/', adminController.statisticsPage);

module.exports = router;