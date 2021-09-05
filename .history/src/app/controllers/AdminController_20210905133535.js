const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Account =   require('../models/Account')
const Product = require('../models/Product');
const List = require('../models/List');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AdminController {
  //[GET] / create Form and food
  index(req, res, next) {
    let ListQuery = List.find({});
    let ProductQuery = Product.find({});
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
  res.redirect('/admin')
 
  }
  pageUpdateProduct(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then((products) => {
        res.render('admin/update_product', {
          products: mongooseToObject(products),
        });
      })
      .catch(next);
  }
  //[patch] admin/:id/update
  pageAccount(req, res, next) {
    Account.find({})
    .then((accounts)=>{
      res.render('admin/account_view',{
        accounts : mutipleMongooseToObject(accounts)
      })
    })
    
}
 articlePage(req,res,next){
    
 }
}
module.exports = new AdminController();
