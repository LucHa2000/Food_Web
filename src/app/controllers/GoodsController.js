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
                    // console.log(queryPromotion)
                    // for (let j = 0; j < queryPromotion.length; j++)
                    // console.log(queryPromotion[j]._id)
                    for (let i = 0; i < products.length; i++) {


                        Promotion.findOne(products[i].promotion_id, {
                                promotion_status: 1
                            })
                            .then((promotion) => {
                                if (promotion.promotion_status === 0) {
                                    products[i].promotion_rate = 0
                                }
                                res.render('user/product_view', {
                                    lists: mutipleMongooseToObject(lists),
                                    products: mutipleMongooseToObject(products),
                                }, )
                            })
                    }
                    //console.log("pro" + queryPromotion[j]._id + "---" + products[i].promotion_id)


                    //    products[i].promotion_id == queryPromotion


                    // res.render('user/product_view', {
                    //     lists: mutipleMongooseToObject(lists),
                    //     products: mutipleMongooseToObject(products),
                    // }, );

                    // Promotion.find({
                    //         _id: products.promotion_id
                    //     })
                    //     .then((promotion) => {
                    //         console.log(promotion)
                    //     })



                    // let arr = []
                    // let newarr = []
                    // for (let j = 0; j < products.length; j++)
                    //     PromotionDetail.findOne({
                    //         _id: products[j].promotionDetails
                    //     })

                    //     .then((promotions) => {




                    //         arr.push(promotions)
                    //         return arr
                    //     })

                    //     .then((arr) => {
                    //         console.log(arr)
                    //     })




                    // for (let i = 0; i < arr.length; i++) {
                    // if (arr[i].product_name == products[j].product_name)

                    // products[j].promotion_rate = arr[i].promotion_rate
                    //}
                    // console.log(products[j].product_name)
                    // console.log(products[j])

                    // res.render('user/product_view', {
                    //     // lists: mutipleMongooseToObject(lists),
                    //     // products: mutipleMongooseToObject(products),
                    //     promotions: mutipleMongooseToObject(arr)

                    // }, )
                    // console.log(products[i].promotionDetails)






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