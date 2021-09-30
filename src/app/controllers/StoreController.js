const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});

const Product = require('../models/Product');
const List = require('../models/List');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class StoreController {
  productAdd(req, res, next) {
    Product.findOne({
      product_name: req.body.product_name,
    }).then((products) => {
      if (products) {
        res.render('admin/error_view', {
          message: 'Product name already exist ! ',
        });
      } else {
        var listID = req.body.list_id;
        // get listID
        req.body.image = req.file.path.split('\\').slice(3).join();
        req.body.product_status = 1;
        req.body.review_id = [];
        req.body.orderDetails = [];
        req.body.promotionDetails = [];
        req.body.list_id = listID;
        const newProduct = new Product(req.body);
        // get dataProduct
        List.findById(listID).then((lists) => {
          newProduct.save();
          lists.product_id.push(newProduct._id);
          lists.save();
          res.redirect('/admin/product');
        });
      }
    });
  }
  //[patch] admin/:id/update
  updateProduct(req, res, next) {
    if (req.file) {
      req.body.image = req.file.path.split('\\').slice(3).join();
    } else {
      req.body.image = req.body.img_old;
    }

    Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
    )
      .then(() => res.redirect('/admin/product'))
      .catch(next);
  }
  deleteProduct(req, res, next) {
    List.updateOne(
      {
        _id: req.params.list_id,
      },
      {
        $pull: {
          product_id: req.params.id,
        },
      },
    )
      .then(() => {
        Product.deleteOne({
          _id: req.params.id,
        }).then(() => {
          res.redirect('/admin/product');
        });
      })

      .catch(next);
  }
  statusProduct(req, res, next) {
    if (req.params.product_status == 1) {
      req.body.product_status = 0;
    } else {
      req.body.product_status = 1;
    }
    Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
    )
      .then((prodcuts) => res.redirect('back'))

      .catch(next);
  }
}
module.exports = new StoreController();
