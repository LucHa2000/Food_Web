var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const articleController = require('../app/controllers/articleController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');


router.get('/:id', accountController.accountDelete);
router.get('/:status/:id', accountController.accountStatus);

module.exports = router;
