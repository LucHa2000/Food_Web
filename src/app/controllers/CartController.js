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
            .then((addedProduct) => {
                Cart.save(addedProduct);
                req.session.cart = Cart.getCart()
                res.redirect('back');
            })
    }
    cartPage(req, res, next) {

        var carts = req.session.cart
        if (!carts) {
            res.render('user/cart', {
                carts: null
            })
        }
        res.render('user/cart', {
            carts: req.session.cart
        })
    }
    removeCart(req, res, next) {
        let deleteProductAndTotalPrice = Cart.delete(req.params.id, req.session.cart.products)
        req.session.cart.totalPrice = req.session.cart.totalPrice - deleteProductAndTotalPrice //  deleteProductAndTotalPrice 
        req.session.cart.totalQty = req.session.cart.totalQty - 1 //delete Totalquantity
        res.redirect('back')
        // console.log(req.session.cart)
    }
    updateQtyCart(req, res, next) {
        let priceOld = Cart.updatePrice(req.params.id, req.session.cart.products)
        let newPrice = Cart.updateQtyCart(req.params.id, req.session.cart.products, req.body.quantity)
        req.session.cart.totalPrice = req.session.cart.totalPrice - priceOld //  
        req.session.cart.totalPrice = req.session.cart.totalPrice + newPrice //  
        res.redirect('back')
    }



}
module.exports = new CartController();