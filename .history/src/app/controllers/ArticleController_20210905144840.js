
const upload = multer({ dest: 'src/public/uploads/' });

const Article = require('../models/Article')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
    accountDelete ( req,res,next ) {
    Account.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('back');
    }
    ) 
    .catch(next)
}
    accountStatus(req,res,next){
        if (req.params.status == 1) {
            req.body.account_status = 0
          } else {
            req.body.account_status = 1
          }
        Account.updateOne({_id:req.params.id},req.body)
        .then((accounts)=>res.redirect('back') )
        
        .catch(next)
    }

}
module.exports = new AccountController();
