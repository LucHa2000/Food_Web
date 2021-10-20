const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const Review = require('../models/Review');
const Product = require('../models/Product');
const List = require('../models/List');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CommentController {
  index(req, res, next) {
    req.body.full_name = req.params.full_name;
    req.body.review_status = 0;
    var newComment = new Review(req.body);
    newComment.save();
    res.redirect('/goods');
  }
}
module.exports = new CommentController();
