const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const Product = require('../models/Product');
const Article = require('../models/Article');
const List = require('../models/List');
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');

class NewsController {
    index(req, res, next) {
        res.render('user/news_view')
    }
   


}
module.exports = new NewsController();