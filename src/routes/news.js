var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const newsController = require('../app/controllers/NewsController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get('/', newsController.index);
router.get('/:id', newsController.newsDetail);

module.exports = router;
