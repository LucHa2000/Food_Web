var express = require('express');
var router = express.Router();
const promotionController = require('../app/controllers/promotionController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
router.get('/:id', authMiddlewares.index, promotionController.promotionDetail);
router.post('/add', promotionController.promotionDetailAdd);
router.get('/:id/detail', promotionController.promotionDetailPageUpdate);
module.exports = router;