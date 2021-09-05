var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const articleController = require('../app/controllers/articleController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');


router.get('/delete/:id', articleController.articleDelete);
router.get('/:id',authMiddlewares.index, articleController.articleUpdatePage);
router.post('/postNews',upload.single('image'), articleController.postNews);
router.get('/:status/:id', articleController.articleStatus);

module.exports = router;
