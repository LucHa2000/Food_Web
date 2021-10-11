const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const Product = require('../models/Product');
const Cart = require('../models/Cart')
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');

class CartController {
    index(req, res, next) {
   Product.findById(req.params.id)
    .then((addedProduct )=>{
        Cart.save(addedProduct);
        req.session.cart = Cart.getCart()
        res.cookie('totalQty', req.session.cart.totalQty )
        res.redirect('/goods')
    })
    
    
    }
    cartPage(req,res,next){
     res.send('cart Page')
    }
   


}
module.exports = new CartController();