var nodemailer = require("nodemailer");//sendEmailConfirm
const Account = require('../models/Account')
class AuthMiddlewares {
    index (req, res, next) {
        if(!req.cookies.userId){
            res.redirect("/auth")
            return
        }
        Account.find({_id: req.cookies.userId})
        .then((accounts)=>{
          if(!accounts) {          
            return;
             }
             res.locals.userName = req.cookies.userName
             res.locals.email = req.cookies.userEmail
             next()
        })
    }

  
    registerConfirmEmail(req,res,next){
        Account.find({email : req.body.confirmEmail})
        .then((accounts)=>{
            if()
        })
        
        next()

    }
}
module.exports = new AuthMiddlewares()