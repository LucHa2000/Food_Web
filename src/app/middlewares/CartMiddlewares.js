var nodemailer = require('nodemailer'); //sendEmailConfirm
const Account = require('../models/Account');
class CartMiddlewares {
  index(req, res, next) {
    // res.locals.totalQty = req.session.cart.totalQty
    // res.locals.totalPrice = req.session.cart.totalPrice
    res.locals.session = req.session
    // console.log(res.locals.session.cart)
    next()
  }

}
module.exports = new CartMiddlewares();