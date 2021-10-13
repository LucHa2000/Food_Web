const multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});
const Account = require("../models/Account");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class CheckoutController {
  index(req, res, next) {
    Account.findOne({
      _id: req.cookies.userId,
    }).then((account) => {
      var carts = req.session.cart;
      if (!carts) {
        res.render("user/checkout", {
          carts: null,
        });
      }
      res.render("user/checkout", {
        carts: req.session.cart,
        account: mongooseToObject(account),
      });
    });
  }
  order(req, res, next) {
    console.log(req);
  }
}
module.exports = new CheckoutController();
