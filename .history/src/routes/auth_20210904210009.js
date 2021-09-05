var express = require('express');
var router = express.Router();
const authMiddlewares = require('../app/middlewares/AuthMiddlewares')
const authController = require('../app/controllers/AuthController');
router.use('/signup', authController.pageSignup);
router.get('/signup_email',authController.pageSignup_email)
router.get('/pageCode',authController.pageCode)
router.post('/register', authController.register);
router.get('/logout',authController.logout)

router.post('/confirmEmail', authController.confirmEmail);
router.post('/user_Login', authController.login);
router.use('/', authController.index);


module.exports= router;