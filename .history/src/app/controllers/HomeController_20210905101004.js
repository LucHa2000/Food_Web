const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Product = require('../models/Product');
const List = require('../models/List');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class HomeController {
  index(req, res, next) {
    res.send('USER PAGE');
  }
}
module.exports = new HomeController();
