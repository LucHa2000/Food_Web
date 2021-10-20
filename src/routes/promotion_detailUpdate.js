var express = require('express');
var router = express.Router();
const promotionController = require('../app/controllers/promotionController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get(
  '/:id',
  authMiddlewares.index,
  promotionController.promotionDetailPageUpdate,
);
router.patch('/:id/edit', promotionController.promotionDetailUpdate);
router.get('/:id/delete', promotionController.promotionDetailDelete);
module.exports = router;
