var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/'
});
const adminController = require('../app/controllers/AdminController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.get('/article', authMiddlewares.index, adminController.articlePage);
router.get('/review', authMiddlewares.index, adminController.reviewPage);
router.get('/promotion', authMiddlewares.index, adminController.promotionPage);
router.get('/account', authMiddlewares.index, adminController.accountPage);
router.get('/product', authMiddlewares.index, adminController.index);
router.get('/list', authMiddlewares.index, adminController.listPage);
router.get('/order', authMiddlewares.index, adminController.orderPage);
router.get('/:id', authMiddlewares.index, adminController.updateProductPage);
router.post(
  '/productStore',
  upload.single('image'),
  adminController.productStore,
);

router.get('/', authMiddlewares.index, adminController.statisticsPage);


module.exports = router;