var express = require('express');
var router = express.Router();
const multer = require('multer');
const commentController = require('../app/controllers/CommentController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');


router.post('/:full_name', commentController.index);




module.exports = router;