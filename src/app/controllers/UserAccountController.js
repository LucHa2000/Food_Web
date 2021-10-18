const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/'
});
const Product = require('../models/Product');
const Order = require('../models/Order');

const Account = require('../models/Account');

const Order_Detail = require('../models/OrderDetail');
const Cart = require('../models/Cart')
const {
  pagination
} = require("../../util/pagination");
const quantityItem = 4
const {
  mutipleMongooseToObject
} = require('../../util/mongoose');
const {
  mongooseToObject
} = require('../../util/mongoose');

class UserAccountController {
  orderPage(req, res, next) {
    // console.log(req.cookies.userId)
    var numberPage = req.query.Page || 1
    let queryReadyOrder = Order.find({
      order_status: 1,
      account_id: req.cookies.userId
    }).sortable(req);
    let queryCancelOrder = Order.find({
      order_status: 0,
      account_id: req.cookies.userId
    }).sortable(req);
    let queryDeliveryOrder = Order.find({
      order_status: 2,
      account_id: req.cookies.userId
    }).sortable(req);
    let queryDoneOrder = Order.find({
      order_status: 3,
      account_id: req.cookies.userId
    }).sortable(req);
    Promise.all([
      queryReadyOrder,
      queryCancelOrder,
      queryDeliveryOrder,
      queryDoneOrder,
    ]).then(([readyOrders, cancelOrders, deliveryOrders, doneOrders]) => {
      res.render("user/user_account_order", {
        readyOrders: mutipleMongooseToObject(pagination(readyOrders, numberPage, quantityItem)),
        deliveryOrders: mutipleMongooseToObject(pagination(deliveryOrders, numberPage, quantityItem)),
        doneOrders: mutipleMongooseToObject(pagination(doneOrders, numberPage, quantityItem)),
        cancelOrders: mutipleMongooseToObject(pagination(cancelOrders, numberPage, quantityItem)),
      });
    });
  }
  statusBackOrder(req, res, next) {
    if (req.params.order_status) {
      req.body.order_status = 1;
    }

    Order.updateOne({
          _id: req.params.id,
        },
        req.body,
      )
      .then(() => res.redirect('back'))
      .catch(next);
  }
  cancelOrder(req, res, next) {
    if (req.params.order_status != 0) {
      req.body.order_status = 0;
    }
    Order.updateOne({
          _id: req.params.id,
        },
        req.body,
      )
      .then((orders) => res.redirect('back'))
      .catch(next);
  }
  index(req, res, next) {
    Account.findOne({
        _id: req.cookies.userId
      })
      .then((account) => {
        console.log(account)
        res.render('user/user_account', {
          account: mongooseToObject(account)
        })

      })

  }
  updateAccount(req, res, next) {
    Account.updateOne({
          _id: req.params.id,
        },
        req.body,
      )
      .then(() => res.redirect('back'))
      .catch(next);
  }
  detailOrder(req, res, next) {
    let queryInfoOrder = Order.findOne({
      account_id: req.cookies.userId,
      _id: req.params.id
    })
    let queryOrderDetail = Order_Detail.find({
      order_id: req.params.id
    })
    Promise.all([
        queryInfoOrder,
        queryOrderDetail,
      ])
      .then(([queryInfoOrder, queryOrderDetail]) => {
        res.render("user/user_account_orderDetail", {
          order: mongooseToObject(queryInfoOrder),
          ordersDetail: mutipleMongooseToObject(queryOrderDetail),
        })
      })
      .catch(next)
  }



}
module.exports = new UserAccountController();