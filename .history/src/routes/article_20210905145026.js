var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const articleController = require('../app/controllers/articleController');


router.get('/:id', articleController.articleDelete);
router.get('/:status/:id', articleController.articleStatus);

module.exports = router;
