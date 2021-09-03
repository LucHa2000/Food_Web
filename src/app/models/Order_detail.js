const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order_detailschema = new Schema({
	quantity: Number,
	unit_price: Number,
   promotion_rate: Number
})

const Order_detail=  mongoose.model('Order_detail', Order_detailschema); 


module.exports = Order_detail
