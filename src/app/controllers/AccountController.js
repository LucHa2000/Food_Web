const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account = require('../models/Account');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
  accountDelete(req, res, next) {
    Account.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }
  trashPage(req, res, next) {
    Account.findDeleted({})
      .sortable(req)
      .then((accounts) => {
        res.render('admin/accountTrashPage', {
          accounts: mutipleMongooseToObject(accounts),
        });
      })
      .catch(next);
  }
  restoreAccount(req, res, next) {
    Account.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  destroy(req, res, next) {
    Account.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  accountStatus(req, res, next) {
    if (req.params.status == 1) {
      req.body.account_status = 0;
    } else {
      req.body.account_status = 1;
    }
    Account.updateOne({ _id: req.params.id }, req.body)
      .then((accounts) => res.redirect('back'))

      .catch(next);
  }
  pageUpdate(req, res, next) {
    Account.findOne({ _id: req.params.id })
      .then((accounts) =>
        res.render('admin/account_update', {
          accounts: mongooseToObject(accounts),
        }),
      )
      .catch(next);
  }
  updateAccount(req, res, next) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin/account'))
      .catch(next);
  }
}
module.exports = new AccountController();
