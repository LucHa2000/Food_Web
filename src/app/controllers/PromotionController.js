const Promotion = require('../models/Promotion');
const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { mongo } = require('mongoose');
var schedule = require('node-schedule');
class PromotionController {
  promotionAdd(req, res, next) {
    //wrong
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

    Product.findOne({
      product_name: req.body.product_name,
    }).then((products) => {
      req.body.cost = products.unit_price;
      var newPromotion = new Promotion(req.body);
      newPromotion.save();
      products.promotion_id = newPromotion._id;
      products.save();
      if (nowDate < req.body.start_date) {
        const job = schedule.scheduleJob(timeStart, function () {
          req.body.promotion_status = 1;
          Promotion.updateOne(
            {
              _id: newPromotion.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Open At : ' + timeStart);
            const job2 = schedule.scheduleJob(timeEnd, function () {
              req.body.promotion_status = 0;
              Promotion.updateOne(
                {
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
          Promotion.updateOne(
            {
              _id: newPromotion.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Close At : ' + timeEnd);
          });
        });
      }
      res.redirect('back');
    });
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
    Promotion.deleteOne({ _id: req.params.id }).then(() => {
      Product.findOne({ promotion_id: req.params.id }).then((products) => {
        products.promotion_id = 'aaacaaaaaaaaaaaaf2132e26';
        products.save();
      });
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
      let nowDate =
        [d.getFullYear(), m, dd].join('-') +
        'T' +
        [d.getHours(), d.getMinutes()].join(':');
      if (nowDate > req.body.start_date && nowDate < req.body.end_date) {
        req.body.promotion_status = 1;
      } else {
        //schedule update status
        req.body.promotion_status = 0;
      }
      if (nowDate < req.body.start_date) {
        const job = schedule.scheduleJob(timeStart, function () {
          req.body.promotion_status = 1;
          Promotion.updateOne(
            {
              _id: req.params.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Open At : ' + timeStart);
            const job2 = schedule.scheduleJob(timeEnd, function () {
              req.body.promotion_status = 0;
              Promotion.updateOne(
                {
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
          Promotion.updateOne(
            {
              _id: newPromotion.id,
            },
            req.body,
          ).then(() => {
            console.log('Promotion Close At : ' + timeEnd);
          });
        });
      }
      Promotion.updateOne(
        {
          _id: req.params.id,
        },
        req.body,
      ).then(() => {
        res.redirect('/admin/promotion');
      });
    });
  }
  promotionStatus(req, res, next) {
    if (req.params.promotion_status == 1) {
      req.body.promotion_status = 0;
    } else {
      req.body.promotion_status = 1;
    }
    Promotion.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
    )
      .then(() => res.redirect('back'))

      .catch(next);
  }
}

module.exports = new PromotionController();
