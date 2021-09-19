const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    product_name: String,
    unit_price: Number,
    quantity: Number,
    image: String,
    note: String,
    product_status: Number,
    list_id: {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
    promotion_id: {
      type: Schema.Types.ObjectId,
      ref: 'Promotion',
    },

    orderDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order_detail',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  },
);
ProductSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};
module.exports = mongoose.model('Product', ProductSchema);
