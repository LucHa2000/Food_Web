var nodemailer = require('nodemailer'); //sendEmailConfirm
const Account = require('../models/Account');
class CartMiddlewares {
  index(req, res, next) {
    res.locals.session = req.session
    res.locals.userName = req.cookies.userName;
    next()
  }

}
module.exports = new CartMiddlewares();