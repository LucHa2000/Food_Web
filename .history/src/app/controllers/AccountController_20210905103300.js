const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
// const {List} =  require('../models/Medical')
//const {Product} =  require('../models/Medical')
// const {Account_Type} =  require('../models/Medical')
const Account =   require('../models/Account')
const Product = require('../models/Product');
const List = require('../models/List');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {

}
module.exports = new AccountController();
