const Promotion = require('../models/Promotion');
const PromotionDetail = require('../models/PromotionDetail');
const Product = require('../models/Product');
const {
  mutipleMongooseToObject
} = require('../../util/mongoose');
const {
  mongooseToObject
} = require('../../util/mongoose');
const {
  pagination
} = require("../../util/pagination");
const {
  mongo
} = require('mongoose');
var schedule = require('node-schedule');
const quantityItem = 4
class PromotionController {
  promotionAdd(req, res, next) {
    req.body.promotionDetail_id = [];

    let timeStart = req.body.start_date;
    let timeEnd = req.body.end_date;
    let d = new Date();
    let m = ('0' + (d.getMonth() + 1)).slice(-2);
    let dd = ('0' + d.getDate()).slice(-2);
    let h = ('0' + d.getHours()).slice(-2);
    let mn = ('0' + d.getMinutes()).slice(-2);

    let nowDate = [d.getFullYear(), m, dd].join('-') + 'T' + [h, mn].join(':');

    if (nowDate > req.body.start_date && nowDate < req.body.end_date) {
      req.body.promotion_status = 1;


    } else {
      //schedule update status

      req.body.promotion_status = 0;
    }

    var newPromotion = new Promotion(req.body);
    newPromotion.save();

    if (nowDate < req.body.start_date) {
      const job = schedule.scheduleJob(timeStart, function () {
        req.body.promotion_status = 1;
        Promotion.updateOne({
            _id: newPromotion.id,
          },
          req.body,
        ).then(() => {
          console.log('Promotion Open At : ' + timeStart);
          const job2 = schedule.scheduleJob(timeEnd, function () {
            req.body.promotion_status = 0;
            Promotion.updateOne({
                _id: newPromotion.id,
              },
              req.body,
            ).then(() => {
              console.log('Promotion Close At : ' + timeEnd);
            });
          });
        });
      });
    } else {
      const job3 = schedule.scheduleJob(timeEnd, function () {
        req.body.promotion_status = 0;
        Promotion.updateOne({
            _id: newPromotion.id,
          },
          req.body,
        ).then(() => {
          console.log('Promotion Close At : ' + timeEnd);
        });
      });
    }
    res.redirect('/admin/promotion');
  }
  promotionUpdatePage(req, res, next) {
    Promotion.findOne({
      _id: req.params.id,
    }).then((promotions) => {
      res.render('admin/promotion_update', {
        promotions: mongooseToObject(promotions),
      });
    });

  }
  promotionDelete(req, res, next) {
    Promotion.deleteOne({
      _id: req.params.id,
    }).then(() => {

      res.redirect('back');
    });
  }
  promotionUpdate(req, res, next) {
    Promotion.findOne({
      _id: req.params.id,
    }).then((promotions) => {
      if (req.body.start_date == '' && req.body.end_date == '') {
        req.body.start_date = promotions.start_date;
        req.body.end_date = promotions.end_date;
      }
      if (req.body.start_date == '') {
        req.body.start_date = promotions.start_date;
      }
      if (req.body.end_date == '') {
        req.body.end_date = promotions.end_date;
      }
      let timeStart = req.body.start_date;
      let timeEnd = req.body.end_date;
      let d = new Date();
      let m = ('0' + (d.getMonth() + 1)).slice(-2);
      let dd = ('0' + d.getDate()).slice(-2);
      let nowDate = [d.getFullYear(), m, dd].join('-') +
        'T' + [d.getHours(), d.getMinutes()].join(':');
      if (nowDate > req.body.start_date && nowDate < req.body.end_date) {
        req.body.promotion_status = 1;
      } else {
        //schedule update status
        req.body.promotion_status = 0;
      }
      if (nowDate < req.body.start_date) {
        const job = schedule.scheduleJob(timeStart, function () {
          req.body.promotion_status = 1;
          Promotion.updateOne({
              _id: req.params.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Open At : ' + timeStart);
            const job2 = schedule.scheduleJob(timeEnd, function () {
              req.body.promotion_status = 0;
              Promotion.updateOne({
                  _id: req.params.id,
                },
                req.body,
              ).then(() => {

                console.log('Promotion Close At : ' + timeEnd);
              });
            });
          });
        });
      } else {
        const job3 = schedule.scheduleJob(timeEnd, function () {
          req.body.promotion_status = 0;
          Promotion.updateOne({
              _id: req.params.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Close At : ' + timeEnd);
          });
        });
      }
      Promotion.updateOne({
          _id: req.params.id,
        },
        req.body,
      ).then(() => {
        res.redirect('/admin/promotion?Page=1');
      });
    });
  }
  promotionStatus(req, res, next) {
    if (req.params.promotion_status == 1) {
      req.body.promotion_status = 0;
    } else {
      req.body.promotion_status = 1;
    }
    Promotion.updateOne({
          _id: req.params.id,
        },
        req.body,
      )
      .then(() => res.redirect('back'))

      .catch(next);
  }
  promotionDetail(req, res, next) {
    var numberPage = req.query.Page || 1
    res.cookie('promotion_id', req.params.id);
    //product not match 
    let queryProduct = Product.find({
      promotion_id: {

        $nin: [req.params.id],


      }
    })
    let queryPromotionDetail = PromotionDetail.find({
      promotion_id: req.params.id,
    }).sortable(req);
    Promise.all([queryProduct, queryPromotionDetail]).then(
      ([products, promotionDetails]) => {
        res.render('admin/promotionDetail_view', {
          products: mutipleMongooseToObject(products),
          promotionDetails: mutipleMongooseToObject(pagination(promotionDetails, numberPage, quantityItem)),
        });
      },
    );
  }
  promotionDetailAdd(req, res, next) {
    Product.findOne({
      product_name: req.body.product_name,
    }).then((products) => {
      if (products.quantity < req.body.quantity) {
        res.render('admin/error_view', {
          message: 'The product in stock is not enough ! ',
        });
      } else {
        req.body.promotion_id = req.cookies.promotion_id;
        var newPromotionProduct = new PromotionDetail(req.body);
        newPromotionProduct.save();
        //push promotionDetail in product
        products.promotion_rate = newPromotionProduct.promotion_rate;
        products.promotionDetails = newPromotionProduct.id;
        products.promotion_id = req.cookies.promotion_id;
        products.save();
        //push promotionDetail in promotion
        Promotion.findOne({
          _id: req.cookies.promotion_id,
        }).then((promotions) => {
          promotions.promotionDetail_id.push(newPromotionProduct.id);
          promotions.save();

          res.redirect('back');
        });
      }
    });


  }
  //Page Update promotion Detail
  promotionDetailPageUpdate(req, res, next) {
    PromotionDetail.findOne({
        _id: req.params.id,
      })
      .then((promotionDetail) => {
        res.render('admin/update_promotionDetail', {
          promotionDetail: mongooseToObject(promotionDetail),
        })
      })
  }
  //Update promotion Detail \ Patch[/:id/edit]
  promotionDetailUpdate(req, res, next) {

    Product.findOne({
      product_name: req.body.product_name,
    }).then((products) => {
      if (products.quantity < req.body.quantity) {
        res.render('admin/error_view', {
          message: 'The product in stock is not enough ! ',
        });
      } else {
        var rate = req.body.promotion_rate;
        // res.req.promotion_id = req.cookies.promotion_id;
        PromotionDetail.updateOne({
            _id: req.params.id,
          },
          req.body,
        ).then(() => {
          //product
          req.body.promotion_rate = rate
          // req.body.promotion_id = '61692b2af3493f5480cdedef'
          // req.body.promotionDetails = '61692b2af3493f5480cdedef'
          Product.updateOne({
                promotionDetails: req.params.id,
              },
              // $pull: {
              //   promotionDetails: req.params.id,
              // },
              // $pull: {
              //   promotion_id: req.cookies.promotion_id,
              // },
              req.body
            )
            .then(() => {
              res.redirect(`/promotionDetail/${req.cookies.promotion_id}?Page=1`);
            })

        });

      }

    })
  }
  //Delete promotion Detail \ [/:id/delete]
  promotionDetailDelete(req, res, next) {

    Promotion.updateOne({
        promotionDetail_id: req.params.id,
      }, {
        $pull: {
          promotionDetail_id: req.params.id,
        },
      }, )
      .then(() => {
        req.body.promotion_rate = 0
        req.body.promotion_id = '61692b2af3493f5480cdedef'
        req.body.promotionDetails = '61692b2af3493f5480cdedef'
        Product.updateOne({
              promotionDetails: req.params.id,
            },
            // $pull: {
            //   promotionDetails: req.params.id,
            // },
            // $pull: {
            //   promotion_id: req.cookies.promotion_id,
            // },
            req.body
          )
          .then(() => {

            PromotionDetail.deleteOne({
              _id: req.params.id,
            }).then(() => {
              res.redirect('back');
            });

          })

      })

      .catch(next);
  }
}

module.exports = new PromotionController();