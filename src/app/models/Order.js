const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    order_status: Number,
    note: String,
    delivery_address: String,
    account_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    orderDetail_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderDetail',
      },
    ],
  },
  {
    timestamps: true,
  },
);
OrderSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};

module.exports = mongoose.model('Order', OrderSchema);
