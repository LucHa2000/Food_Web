var nodemailer = require('nodemailer'); //sendEmailConfirm
const Account = require('../models/Account');
class AuthMiddlewares {
  index(req, res, next) {
    if (!req.cookies.userId || req.cookies.accountType == 1) {
      res.redirect('/auth');
      return;
    }
    Account.find({
      _id: req.cookies.userId,
    }).then((accounts) => {
      if (!accounts) {
        return;
      }

      res.locals.userName = req.cookies.userName;
      res.locals.email = req.cookies.userEmail;
      res.locals.author = req.cookies.author;
      next();
    });
  }
}
module.exports = new AuthMiddlewares();
