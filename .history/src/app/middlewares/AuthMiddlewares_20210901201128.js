var nodemailer = require("nodemailer");//sendEmailConfirm
const {Account} = require('../models/Medical')
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
             next()
        })
    }

    registerCheck(req,res,next){
   
        Account.find({email : req.body.email})
        .then((accountCheck)=>{  
            if(!accountCheck){         
               
            
            res.locals.email = req.body.email
            res.locals.full_name= req.body.full_name
            res.locals.password= req.body.password
            res.locals.phone_number = req.body.phone_number
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
                  to:  res.locals.email,
                  subject: 'Confirm Email',
                  text: '123'
                };
                next()
                transporter.sendMail(mailMessage, function(error, data){
                  if (error) {
                    console.log(error);
                  } else {
                  next()
                  }
                });
            
              }
              res.render('auth/signup',{error : "The account already exists"})       
        })
        .catch(next)
        
    }
  
    registerConfirmEmail(req,res,next){
        if(req.body.confirmEmail== '123')
        next()

    }
}
module.exports = new AuthMiddlewares()