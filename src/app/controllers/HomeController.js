const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const Review = require('../models/Review');
const Product = require('../models/Product');
const Article = require('../models/Article');
const List = require('../models/List');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class HomeController {
  index(req, res, next) {
    res.clearCookie('message');
    res.clearCookie('errorConfirm');
    req.session.views = 20;
    let queryArticle = Article.find({
      article_status: 1,
    });
    let queryProduct = Product.find({
      product_status: 1,
    });
    Promise.all([queryArticle, queryProduct]).then(([articles, products]) => {
      res.render('user/user_home', {
        articles: mutipleMongooseToObject(articles.slice(0, 3)),
        products: mutipleMongooseToObject(products.slice(0, 6)),
      });
    });
  }

  productsDetailPage(req, res, next) {
    let queryProduct = Product.findOne({
      product_name: req.params.product_name,
      product_status: 1,
    });
    let queryReview = Review.find({
      product_name: req.params.product_name,
      review_status: 1,
    });
    Promise.all([queryProduct, queryReview]).then(
      ([queryProduct, queryReview]) => {
        res.render('user/product_detail', {
          products: mongooseToObject(queryProduct),
          reviews: mutipleMongooseToObject(queryReview),
        });
      },
    );
  }
  aboutPage(req, res, next) {
    res.render('user/about_view');
  }
}
module.exports = new HomeController();
