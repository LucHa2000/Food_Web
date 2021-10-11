var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const homeController = require('../app/controllers/HomeController');
const authMiddlewares_user = require('../app/middlewares/AuthMiddlewares_user');

router.get('/:product_name', homeController.productsDetailPage);
router.get('/about/view', homeController.aboutPage);
router.get('/', homeController.index);



module.exports = router;