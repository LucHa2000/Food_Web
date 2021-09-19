var express = require('express');
var router = express.Router();
const reviewController = require('../app/controllers/ReviewController');

router.get('/:status/:id', reviewController.reviewStatus);
router.get('/:id', reviewController.reviewDelete);
module.exports = router;
