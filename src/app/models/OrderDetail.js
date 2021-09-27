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
OrderDetailSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};

module.exports = mongoose.model('Order_Detail', OrderDetailSchema);