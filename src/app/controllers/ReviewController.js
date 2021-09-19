const List = require('../models/List');
const Review = require('../models/Review');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class ReviewController {
  reviewStatus(req, res, next) {
    if (req.params.status == 1) {
      req.body.review_status = 0;
    } else {
      req.body.review_status = 1;
    }
    Review.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('back'))

      .catch(next);
  }
  reviewDelete(req, res, next) {
    Review.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }
}

module.exports = new ReviewController();
