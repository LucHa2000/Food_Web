const List = require('../models/List');
const Order = require('../models/Order');
const {
  mutipleMongooseToObject
} = require('../../util/mongoose');
const {
  mongooseToObject
} = require('../../util/mongoose');
class OrderController {
  statusOrder(req, res, next) {
    if (req.params.order_status == 1) {
      req.body.order_status = 2;
    }
    if (req.params.order_status == 2) {
      req.body.order_status = 3;
    }
    Order.updateOne({
        _id: req.params.id
      }, req.body)
      .then((orders) => res.redirect('back'))
      .catch(next);
  }
  cancelOrder(req, res, next) {
    if (req.params.order_status != 0) {
      req.body.order_status = 0;
    }
    Order.updateOne({
        _id: req.params.id
      }, req.body)
      .then((orders) => res.redirect('back'))
      .catch(next);
  }

}

module.exports = new OrderController();