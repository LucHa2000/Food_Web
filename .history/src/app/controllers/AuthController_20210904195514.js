const Account = require('../models/Account')
const {
    mutipleMongooseToObject
} = require('../../util/mongoose')
var nodemailer = require("nodemailer"); //sendEmailConfirm
const {
    mongooseToObject
} = require('../../util/mongoose')
nodemailer = require("nodemailer"); //sendEmailConfirm
class AuthController {
    index(req, res, next) {
        res.render('auth/login')
    }
    pageSignup_email(req, res, next) {
        res.render
    }
    pageSignup(req, res, next) {
        res.render('auth/signup')
    }
    //auth [put] / register
    register(req, res, next) {
        req.body.account_status = 0
        req.body.accountType = 1    
        const account = new Account(req.body)
        Account.findOne({
                email: req.body.email
            })
            .then((accounts) => {
                if (!accounts) {
                    res.render('auth/signup', {
                        error: "the account has already been exist"
                    })
                } else {
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'danchoiphonui27@gmail.com', // generated ethereal user
                            pass: 'danchoiphonui27' // generated ethereal password
                        }
                    });
                    var mailMessage = {
                        from: 'danchoiphonui27@gmail.com',
                        to: req.body.email,
                        subject: 'Confirm Email',
                        text: 'new confirm'
                    };
                    transporter.sendMail(mailMessage, function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + data.response);
                        }
                    });

                    account.save()
                        .then((accounts) => {
                            res.jon(accounts)
                        })
                }
            })
            .catch(next())
    }
    confirmEmail(req, res, next) {
        res.render('auth/confirmEmail_view')
    }
    logout(req,res,next){
        res.clearCookie('userId')
        res.clearCookie('userEmail')
        res.clearCookie('userName')
        res.redirect('/auth')
    }
    //[post] auth/user_login
    login(req, res, next) {
        Account.findOne({
                email: req.body.email
            })
            .then((accounts) => {
                if (accounts.password == req.body.password && accounts.account_status == 1 ) {
                       
                        if (req.body["g-recaptcha-response"]) {
                            res.cookie('userId', accounts._id)
                            res.cookie('userEmail', accounts.email)
                            res.cookie('userName', accounts.full_name)
                            if (accounts.accountType === 1) {
                                res.redirect('/')
                            } else {
                            
                                res.redirect('/admin')
                            }
                        } else {
                            res.render("auth/login", {
                                errorConfirm: "Check Confirm",
                                Email: req.body.email
                            })
                        }
                    
                } else {
                    res.render("auth/login", {
                        errorConfirm: "account not exist",
                        Email: req.body.email
                    })
                }

            })
            .catch(next)
    }
}
module.exports = new AuthController()