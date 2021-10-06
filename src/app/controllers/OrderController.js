const Order = require('../models/Order');
const Order_Detail = require('../models/OrderDetail');
const {
  mutipleMongooseToObject
} = require('../../util/mongoose');
const {
  mongooseToObject
} = require('../../util/mongoose');
const {
  mongo
} = require('mongoose');
const {
  pagination
} = require("../../util/pagination");
const quantityItem = 4
class OrderController {
  statusOrder(req, res, next) {
    if (req.params.order_status == 1) {
      req.body.order_status = 2;
    }
    if (req.params.order_status == 2) {
      req.body.order_status = 3;
    }
    if (req.params.order_status == 0) {
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
  statusBackOrder(req, res, next) {
    if (req.params.order_status) {
      req.body.order_status = 1;
    }
    Order.updateOne({
          _id: req.params.id,
        },
        req.body,
      )
      .then((orders) => res.redirect('/admin/order?Page=1'))
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
      .then((orders) => res.redirect('/admin/order?Page=1'))
      .catch(next);
  }
  detailOrder(req, res, next) {
    var numberPage = req.query.Page || 1
    Order_Detail.find({
        order_id: req.params.id,
      }).sortable(req)
      .then((ordersDetail) => {
        res.render('admin/orderDetail_view', {
          ordersDetail: mutipleMongooseToObject((pagination(ordersDetail, numberPage, quantityItem))),
        });
      });
  }
  orderDelete(req, res, next) {
    Order.deleteOne({
        _id: req.params.id,
      })
      .then(() => {
        res.redirect('/admin/order?Page=1');
      })
      .catch(next);
  }
}

module.exports = new OrderController();