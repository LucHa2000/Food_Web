const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const Promotion = require('../models/Promotion')
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
            .catch(next)
    }
    cartPage(req, res, next) {
        if (req.session.cart === undefined) {
            res.render('user/cart', {
                carts: null
            })
        } else {
            let carts = req.session.cart.products

            for (let i = 0; i < carts.length; i++) {
                Promotion.findOne({
                        _id: carts[i].promotion_id
                    }, {
                        promotion_status: 1
                    })
                    .then((promotion) => {
                        if (promotion) {
                            if (promotion.promotion_status === 0) {
                                carts[i].promotion_rate = 0
                            }
                            res.render('user/cart', {
                                carts: req.session.cart
                            })
                        } else {
                            res.render('user/cart', {
                                carts: req.session.cart
                            })
                        }
                    })
                    .catch(next)
            }
        }
    }
    removeCart(req, res, next) {
        // console.log(req.session.cart)
        if (req.session.cart.totalProduct == 1) {
            // req.session.destroy(err => {
            //     if (err) return next(err)
            //     res.status(200).send('logged out')
            // })
            res.clearCookie('connect.sid')
            req.session = null;

            // req.session.destroy()
            // console.log(req.session)
            res.redirect('/cart')
        } else {

            req.session.cart.totalProduct = req.session.cart.totalProduct - 1 //delete Totalproduct
            let deleteProductAndTotalPrice = Cart.delete(req.params.id, req.session.cart.products)
            req.session.cart.totalPrice = req.session.cart.totalPrice - deleteProductAndTotalPrice //  deleteProductAndTotalPrice 
            req.session.cart.totalQty = req.session.cart.totalQty - 1 //delete Totalquantity
            res.redirect('back')
        }


    }
    updateQtyCart(req, res, next) {
        Product.findById(req.params.id)
            .then((product) => {
                if (req.body.quantity > product.quantity) {
                    res.render('admin/error_view', {
                        message: 'The product in stock is not enough ! ',
                    });
                } else {
                    let priceOld = Cart.updatePrice(req.params.id, req.session.cart.products)
                    let newPrice = Cart.updateQtyCart(req.params.id, req.session.cart.products, req.body.quantity)
                    req.session.cart.totalPrice = req.session.cart.totalPrice - priceOld //  
                    req.session.cart.totalPrice = req.session.cart.totalPrice + newPrice //  
                    res.redirect('back')
                }
            })
    }
    removeAllCart(req, res, next) {

        res.clearCookie('connect.sid')
        res.redirect('back')


    }



}
module.exports = new CartController();