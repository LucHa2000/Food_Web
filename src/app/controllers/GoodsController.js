const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});
const Product = require('../models/Product');
const Article = require('../models/Article');
const PromotionDetail = require('../models/PromotionDetail')
const Promotion = require('../models/Promotion')
const List = require('../models/List');
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');

class GoodsController {
    index(req, res, next) {
        let queryPromotion = Promotion.find({})

        let queryList = List.find({})
        let queryProduct = Product.find({
            product_status: 1
        })
        Promise.all([queryList, queryProduct])
            .then(
                ([lists, products]) => {
                    for (let i = 0; i < products.length; i++) {
                        Promotion.findOne({
                                _id: products[i].promotion_id
                            }, {
                                promotion_status: 1
                            })
                            .then((promotion) => {
                                if (promotion) {
                                    if (promotion.promotion_status === 0) {
                                        products[i].promotion_rate = 0
                                    }
                                    res.render('user/product_view', {
                                        lists: mutipleMongooseToObject(lists),
                                        products: mutipleMongooseToObject(products),
                                    }, )
                                }
                                res.render('user/product_view', {
                                    lists: mutipleMongooseToObject(lists),
                                    products: mutipleMongooseToObject(products),
                                }, )

                            })

                    }
                })
    }
    productsFilterPage(req, res, next) {
        let queryList = List.find({

        })
        let queryProduct = Product.find({
            product_status: 1,
            list_id: req.params.list_id
        })
        Promise.all([queryList, queryProduct]).then(
            ([lists, products]) => {
                res.render('user/product_view', {
                    lists: mutipleMongooseToObject(lists),
                    products: mutipleMongooseToObject(products),

                }, );

            })

    }


}
module.exports = new GoodsController();