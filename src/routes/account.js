var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const accountController = require('../app/controllers/accountController');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

router.get('/trash', authMiddlewares.index, accountController.trashPage);
router.patch('/:id/restore', accountController.restoreAccount);
router.get('/delete/:id', accountController.accountDelete);
router.get('/:id', accountController.pageUpdate);
router.get('/:id/destroy', accountController.destroy);
router.get('/:status/:id', accountController.accountStatus);
router.post('/register', accountController.accountCreate);
router.patch('/:id/edit', accountController.updateAccount);
module.exports = router;
