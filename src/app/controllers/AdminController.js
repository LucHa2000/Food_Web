const multer = require('multer');
const mongoose = require('mongoose');
const upload = multer({
  dest: 'src/public/uploads/',
});
const Account = require('../models/Account');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const Promotion = require('../models/Promotion');
const List = require('../models/List');
const Article = require('../models/Article');
const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { pagination } = require('../../util/pagination');
const Review = require('../models/Review');

const quantityItem = 4;

class AdminController {
  //[GET] / create Form
  index(req, res, next) {
    var numberPage = req.query.Page || 1;
    let ListQuery = List.find({});
    let ProductQuery = Product.find({}).sortable(req);
    Promise.all([ListQuery, ProductQuery])
      .then(([lists, products]) => {
        res.render('admin/product_manament', {
          products: mutipleMongooseToObject(
            pagination(products, numberPage, quantityItem),
          ),
          lists: mutipleMongooseToObject(lists),
        });
      })
      .catch(next);
  }
  updateProductPage(req, res, next) {
    let ListQuery = List.find();
    let ProductQuery = Product.findOne({
      _id: req.params.id,
    });
    let currentList = Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${req.params.id}`),
        },
      },
      {
        $lookup: {
          from: 'lists',
          localField: 'list_id',
          foreignField: '_id',
          as: 'list',
        },
      },
      {
        $unwind: '$list',
      },
    ]);

    Promise.all([ProductQuery, ListQuery, currentList])
      .then(([products, lists, currentList]) => {
        res.render('admin/update_product', {
          products: mongooseToObject(products),
          lists: mutipleMongooseToObject(lists),
          currentList: currentList[0],
        });
      })
      .catch(next);
  }
  //[patch] admin/:id/update
  accountPage(req, res, next) {
    var numberPage = req.query.Page || 1;
    let account = Account.find({}).sortable(req);
    let count = Account.countDeleted({});
    Promise.all([account, count]).then(([accounts, counts]) => {
      res.render('admin/account_view', {
        accounts: mutipleMongooseToObject(
          pagination(accounts, numberPage, quantityItem),
        ),
        counts: counts,
      });
    });
  }
  listPage(req, res, next) {
    var numberPage = req.query.Page || 1;
    List.find({})
      .sortable(req)
      .then((lists) => {
        res.render('admin/list_view', {
          lists: mutipleMongooseToObject(
            pagination(lists, numberPage, quantityItem),
          ),
        });
      })
      .catch(next);
  }
  articlePage(req, res, next) {
    var numberPage = req.query.Page || 1;
    Article.find({})
      .sortable(req)
      .then((articles) => {
        res.render('admin/article_view', {
          articles: mutipleMongooseToObject(
            pagination(articles, numberPage, quantityItem),
          ),
        });
      });
  }
  reviewPage(req, res, next) {
    var numberPage = req.query.Page || 1;
    Review.find({})
      .sortable(req)
      .then((reviews) => {
        res.render('admin/review_page', {
          reviews: mutipleMongooseToObject(
            pagination(reviews, numberPage, quantityItem),
          ),
        });
      });
  }
  promotionPage(req, res, next) {
    var numberPage = req.query.Page || 1;
    Promotion.find({})
      .sortable(req)
      .then((promotions) => {
        res.render('admin/promotion_view', {
          promotions: mutipleMongooseToObject(
            pagination(promotions, numberPage, quantityItem),
          ),
        });
      });
  }
  orderPage(req, res, next) {
    var numberPage = req.query.Page || 1;
    let queryReadyOrder = Order.find({
      order_status: 1,
    }).sortable(req);
    let queryCancelOrder = Order.find({
      order_status: 0,
    }).sortable(req);
    let queryDeliveryOrder = Order.find({
      order_status: 2,
    }).sortable(req);
    let queryDoneOrder = Order.find({
      order_status: 3,
    }).sortable(req);
    Promise.all([
      queryReadyOrder,
      queryCancelOrder,
      queryDeliveryOrder,
      queryDoneOrder,
    ]).then(([readyOrders, cancelOrders, deliveryOrders, doneOrders]) => {
      res.render('admin/order_view', {
        readyOrders: mutipleMongooseToObject(
          pagination(readyOrders, numberPage, quantityItem),
        ),
        deliveryOrders: mutipleMongooseToObject(
          pagination(deliveryOrders, numberPage, quantityItem),
        ),
        doneOrders: mutipleMongooseToObject(
          pagination(doneOrders, numberPage, quantityItem),
        ),
        cancelOrders: mutipleMongooseToObject(
          pagination(cancelOrders, numberPage, quantityItem),
        ),
      });
    });
  }
  statisticsPage(req, res, next) {
    OrderDetail.find({}).then((orderDetails) => {
      res.render('admin/statistics_page', {
        orderDetails: mutipleMongooseToObject(orderDetails),
      });
    });
  }
  PickStatisticsPage(req, res, next) {
    OrderDetail.find({
      createdAt: {
        $gte: req.body.start_date,
        $lt: req.body.end_date,
      },
    }).then((orderDetails) => {
      res.render('admin/statistics_page', {
        orderDetails: mutipleMongooseToObject(orderDetails),
      });
    });
  }
}
module.exports = new AdminController();
