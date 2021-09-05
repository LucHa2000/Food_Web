const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account =   require('../models/Account')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
    accountDelete ( req,res,next ) {
        Account.deleteOne({_id : req.params.id})
        .then(()=> res.redirect('back'))
        .next()
    }
    Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/admin');
    });
}
module.exports = new AccountController();
