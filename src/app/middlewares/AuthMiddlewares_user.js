var nodemailer = require('nodemailer'); //sendEmailConfirm
const Account = require('../models/Account');
class AuthMiddlewares_user {
    index(req, res, next) {
        Account.find({
            _id: req.cookies.userId
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
module.exports = new AuthMiddlewares_user();