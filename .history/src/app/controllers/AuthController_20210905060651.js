var nodemailer = require("nodemailer");//sendEmailConfirm
const Account = require('../models/Account')
let Random = (Math.floor((Math.random() * 1000000) + 100)).toString();
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
        res.render('auth/signup_email')
    }
    pageSignup(req, res, next) {
        if(req.cookies.code){
            res.clearCookie('code')
            res.render('auth/signup')
        }
        else{
            res.redirect('/auth/singup_email')
        }
    }
    //auth [put] / register
    register(req, res, next) {
        req.body.account_status= 1
        req.body.accountType = 1 
        req.body.email = req.cookies.email
        const newProduct = new Product(req.body)
        res

    }
    
    pageCode(req, res, next) {
        res.render('auth/confirmEmail_view')
    }
    confirmCode(req,res,next){
      if  (req.body.code == req.cookies.code){
        res.redirect('/auth/signup')
      }
      else {
         res.redirect('back')
      }
    }
   sendMail(req, res, next) {
        Account.findOne({email : req.body.confirmEmail})
        .then((accounts)=>{
            if(!accounts) { 

                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                    user: 'danchoiphonui27@gmail.com', // generated ethereal user
                    pass: 'danchoiphonui27'// generated ethereal password
                    }
                    });
                    var mailMessage = {
                    from: 'danchoiphonui27@gmail.com',
                    to: req.body.confirmEmail,
                    subject: 'Confirm Email',
                    text: Random
                    };
                    transporter.sendMail(mailMessage, function(error, data){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("send success");
                    }
            
                    });
                    res.cookie('code', Random)
                    res.cookie('email', req.body.confirmEmail)
               res.redirect('/auth/pageCode')
            }
            else{
                res.redirect('back')
            }
        })
        
        next()

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