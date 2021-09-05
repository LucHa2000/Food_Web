const Account = require('../models/Account')
const {mutipleMongooseToObject} = require('../../util/mongoose')
var nodemailer = require("nodemailer"); //sendEmailConfirm
const {mongooseToObject} = require('../../util/mongoose')
nodemailer = require("nodemailer"); //sendEmailConfirm
class AuthController {
    index(req, res, next) {
        res.render('auth/login')
    }
    pageSignup(req, res, next) {
        res.render('auth/signup')
    }
    //auth [put] / register
    register(req, res, next) {

        req.body.account_status = 0
        req.body.account_type = 1
        req.body.reviews = [],
            req.body.orders = [],
            req.body.articles = []

        const account = new Account(req.body)

        Account.find({
                email: req.body.email
            })
            .then((accounts) => {


                if (accounts.length > 0) {
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
                    .then((accounts)=>{res.jon(accounts)} )
                }




            })
            .catch(next())
    }
    confirmEmail(req, res, next) {
        res.render('auth/confirmEmail_view')

    }
    //[post] auth/user_login
    login(req, res, next) {

        Account.findOne({
                password: req.body.password,
                email: req.body.email
            })
            .then((accounts)=> res.json(accounts))
            
    }





}
module.exports = new AuthController()