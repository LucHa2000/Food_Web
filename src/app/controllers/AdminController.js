const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account = require('../models/Account');
const Product = require('../models/Product');
const Promotion = require('../models/Promotion');
const List = require('../models/List');
const Article = require('../models/Article');
const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Review = require('../models/Review');

class AdminController {
  //[GET] / create Form and food
  index(req, res, next) {
    let ListQuery = List.find({});
    let ProductQuery = Product.find({}).sortable(req);
    Promise.all([ProductQuery, ListQuery])
      .then(([products, lists]) =>
        res.render('admin/product_manament', {
          products: mutipleMongooseToObject(products),
          lists: mutipleMongooseToObject(lists),
        }),
      )
      .catch(next);
  }
  //[POST]
  productStore(req, res, next) {
    var listID = req.body.list_id;
    // get listID
    req.body.image = req.file.path.split('\\').slice(3).join();
    req.body.product_status = 1;
    req.body.review_id = [];
    req.body.orderDetail_id = [];
    req.body.promotionDetails_id = [];
    req.body.list_id = listID;
    const newProduct = new Product(req.body);
    // get dataProduct
    List.findById(listID).then((lists) => {
      newProduct.save();
      lists.product_id.push(newProduct._id);
      lists.save();
      res.redirect('/admin');
    });
    res.redirect('/admin');
  }
  updateProductPage(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then((products) => {
        res.render('admin/update_product', {
          products: mongooseToObject(products),
        });
      })
      .catch(next);
  }
  //[patch] admin/:id/update
  accountPage(req, res, next) {
    let account = Account.find({}).sortable(req);
    let count = Account.countDeleted({});
    Promise.all([account, count]).then(([accounts, counts]) => {
      res.render('admin/account_view', {
        accounts: mutipleMongooseToObject(accounts),
        counts: counts,
      });
    });
  }
  listPage(req, res, next) {
    List.find({})
      .sortable(req)
      .then((lists) => {
        res.render('admin/list_view', {
          lists: mutipleMongooseToObject(lists),
        });
      })
      .catch(next);
  }
  articlePage(req, res, next) {
    Article.find({})
      .sortable(req)
      .then((articles) => {
        res.render('admin/article_view', {
          articles: mutipleMongooseToObject(articles),
        });
      });
  }
  reviewPage(req, res, next) {
    Review.find({})
      .sortable(req)
      .then((reviews) => {
        res.render('admin/review_page', {
          reviews: mutipleMongooseToObject(reviews),
        });
      });
  }
  promotionPage(req, res, next) {
    let queryProduct = Product.find({
      promotion_id: 'aaacaaaaaaaaaaaaf2132e26',
    });
    let queryPromotion = Promotion.find({}).sortable(req);
    Promise.all([queryProduct, queryPromotion]).then(
      ([products, promotions]) => {
        res.render('admin/promotion_view', {
          products: mutipleMongooseToObject(products),
          promotions: mutipleMongooseToObject(promotions),
        });
      },
    );
  }
  orderPage(req, res, next) {
    let queryReadyOrder = Order.find({ order_status: 1 }).sortable(req);
    let queryCancelOrder = Order.find({ order_status: 0 }).sortable(req);
    let queryDeliveryOrder = Order.find({ order_status: 2 }).sortable(req);
    let queryDoneOrder = Order.find({ order_status: 3 }).sortable(req);
    Promise.all([
      queryReadyOrder,
      queryCancelOrder,
      queryDeliveryOrder,
      queryDoneOrder,
    ]).then(([readyOrders, cancelOrders, deliveryOrders, doneOrders]) => {
      res.render('admin/order_view', {
        readyOrders: mutipleMongooseToObject(readyOrders),
        deliveryOrders: mutipleMongooseToObject(deliveryOrders),
        doneOrders: mutipleMongooseToObject(doneOrders),
        cancelOrders: mutipleMongooseToObject(cancelOrders),
      });
    });
  }
}
module.exports = new AdminController();
