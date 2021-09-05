// const List =  require('../models/List')
// const {mutipleMongooseToObject} = require('../../util/mongoose')
// class ListController {
//     //[GET] / news

//     index(req, res,next) {
//         let foodQuery = List.find({list_name : req.params.list_name})
//         let listQuery= List.find({})

//         Promise.all([foodQuery, listQuery])
//         .then(([foods,lists]) => res.render('lists',{
//             foods : mutipleMongooseToObject(foods),
//             lists : mutipleMongooseToObject(lists)
//         }))
//         .catch(next)

//         }

//     }

//   module.exports = new ListController();
