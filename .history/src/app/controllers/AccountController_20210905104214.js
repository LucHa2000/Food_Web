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
        if () {
            req.body.image = req.file.path.split('\\').slice(3).join();
          } else {
            req.body.image = req.body.img_old;
          }
        Account.updateOne({_id:req.params.id})
    
    }
    //[patch] admin/:id/update
  updateProduct(req, res, next) {
    if (req.file) {
      req.body.image = req.file.path.split('\\').slice(3).join();
    } else {
      req.body.image = req.body.img_old;
    }

    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin'))
      .catch(next);
  }
}
module.exports = new AccountController();
