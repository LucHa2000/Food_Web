const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionDetailSchema = new Schema(
  {
    promotion_id: {
      type: Schema.Types.ObjectId,
      ref: 'Promotion',
    },
    product_name: {
      type: String,
      ref: 'Product',
    },
    quantity: Number,
    promotion_rate: Number,
  },
  {
    timestamps: true,
  },
);
PromotionDetailSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};

module.exports = mongoose.model('Promotion_Detail', PromotionDetailSchema);
