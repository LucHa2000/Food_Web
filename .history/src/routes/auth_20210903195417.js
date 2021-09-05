var express = require('express');
var router = express.Router();
const authMiddlewares = require('../app/middlewares/AuthMiddlewares')
const authController = require('../app/controllers/AuthController');
router.use('/signup', authController.pageSignup);
router.post('/register', authController.register);
router.use('/logout',authController.lo)
router.post('/confirmEmail', authController.confirmEmail);
router.post('/user_Login', authController.login);
router.use('/', authController.index);


module.exports= router;