var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const accountController = require('../app/controllers/accountController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');


router.get('/:id', accountController.accountDelete);
router.patch('/:status/:id', accountController.accountDelete);

module.exports = router;
