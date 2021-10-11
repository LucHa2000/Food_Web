var nodemailer = require('nodemailer'); //sendEmailConfirm
const Account = require('../models/Account');
class CartMiddlewares {
  index(req, res, next) {
     res.locals.totalQty = req.cookies.totalQty
     next()
  }
}
module.exports = new CartMiddlewares();
