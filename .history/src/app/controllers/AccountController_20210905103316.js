const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account =   require('../models/Account')

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {

}
module.exports = new AccountController();
