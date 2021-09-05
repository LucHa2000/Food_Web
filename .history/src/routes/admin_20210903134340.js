var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'src/public/uploads/'})
const adminController = require('../app/controllers/AdminController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares')

router.get('/account',adminController.pageAccount);
router.get('/:id',adminController.pageUpdateProduct);
router.post('/productStore',upload.single('image'),adminController.productStore);

router.get('/' ,,adminController.index);



module.exports = router;