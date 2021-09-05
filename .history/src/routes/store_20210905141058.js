var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const storeController = require('../app/controllers/storeController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.patch(
  '/:id/edit',
  upload.single('image'),
  storeController.updateProduct,
);
router.get('/:list_id/:id', storeController.deleteProduct);
router.get('/status/:product_st', upload.single('image'), storeController.productAdd);
router.post('/product', upload.single('image'), storeController.productAdd);

module.exports = router;
