const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});
const Account = require('../models/Account');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CheckoutController {
  index(req, res, next) {
    Account.findOne({
      _id: req.cookies.userId,
    }).then((account) => {
      var carts = req.session.cart;
      if (!carts) {
        res.render('user/checkout', {
          carts: null,
        });
      }
      res.render('user/checkout', {
        carts: req.session.cart,
        account: mongooseToObject(account),
      });
    });
  }
  order(req, res, next) {
    //save Order

    req.body.order_status = 1;
    req.body.orderDetail_id = [];
    let newOrder = new Order(req.body);
    newOrder.save();

    let arr = req.session.cart.products;

    for (let i = 0; i < arr.length; i = i + 1) {
      arr[i].order_id = newOrder._id;
      // arr[i].promotion_rate = 0
    }

    OrderDetail.insertMany(arr);

    Cart.initCart();
    res.clearCookie('connect.sid');
    // return res.redirect('/cart');
    res.redirect('/user_account/view_order');
    //save orderDetail
  }
}
module.exports = new CheckoutController();
