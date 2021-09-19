const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  product_name: {
    type: String,
    ref: 'Product',
  },
  quantity: Number,
  unit_price: Number,
  promotion_rate: Number,
}, {
  timestamps: true,
}, );

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);