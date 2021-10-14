const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: String,
  phone_number: Number,
  full_name: String,
  order_status: Number,
  note: String,
  delivery_address: String,
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  orderDetail_id: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderDetail',
  }, ],
}, {
  timestamps: true,
}, );
OrderSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};

module.exports = mongoose.model('Order', OrderSchema);