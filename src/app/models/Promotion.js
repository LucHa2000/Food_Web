const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PromotionSchema = new Schema(
  {
    promotion_rate: Number,
    promotion_name: String,
    start_date: Date,
    end_date: Date,
    cost: Number,
    promotion_status: Number,
    product_name: {
      type: String,
      ref: 'Product',
    },
    note: String,
  },
  { timestamps: true },
);
PromotionSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};
module.exports = mongoose.model('Promotion', PromotionSchema);
