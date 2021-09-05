var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const homeController = require('../app/controllers/HomeController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get('/', homeController.index);

module.exports = router;
