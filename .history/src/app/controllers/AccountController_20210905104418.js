const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account =   require('../models/Account')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
    accountDelete ( req,res,next ) {
    Account.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('back');
    }
    ) 
}
    accountStatus(req,res,next){
        if (req.params.status == 1) {
            req.body.account_status = 0
          } else {
            req.body.account_status = 1
          }
        Account.updateOne({_id:req.params.id},req.body)
        .then((accounts)=>res.json(accounts) )

    
    }
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin'))
      .catch(next);
  }
}
module.exports = new AccountController();
