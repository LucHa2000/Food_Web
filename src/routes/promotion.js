var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const promotionController = require('../app/controllers/promotionController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.patch('/:id/edit', promotionController.promotionUpdate);
router.get('/:id', promotionController.promotionUpdatePage);
router.get('/:id/delete', promotionController.promotionDelete);
router.get(
  '/status/:promotion_status/:id',
  promotionController.promotionStatus,
);
router.post('/create', promotionController.promotionAdd);
module.exports = router;
