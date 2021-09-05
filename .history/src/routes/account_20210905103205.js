var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const storeController = require('../app/controllers/storeController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');


router.delete('/:id', .productAdd);

module.exports = router;
