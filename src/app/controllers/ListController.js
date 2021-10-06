const List = require('../models/List');
const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class ListController {
  listDelete(req, res, next) {
    List.findOne({
      _id: req.params.id,
    })
      .then((lists) => {
        Product.deleteMany({
          _id: {
            $in: lists.product_id,
          },
        })
          .then(() => {
            List.deleteOne({
              _id: req.params.id,
            }).then(() => {
              res.redirect('back');
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  listUpdatePage(req, res, next) {
    List.findOne({
      _id: req.params.id,
    })
      .then((lists) => {
        res.render('admin/listUpdate_view', {
          lists: mongooseToObject(lists),
        });
      })
      .catch(next);
  }
  listUpdate(req, res, next) {
    List.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
    )
      .then(() => res.redirect('/admin/list?Page=1'))
      .catch(next);
  }
  create(req, res, next) {
    List.findOne({
      list_name: req.body.list_name,
    }).then((lists) => {
      if (lists) {
        res.render('admin/error_view', {
          message: 'List name already exist ! ',
        });
      } else {
        req.body.product_id = [];
        var newList = new List(req.body);
        newList.save();
        res.redirect('back');
      }
    });
  }
}

module.exports = new ListController();
