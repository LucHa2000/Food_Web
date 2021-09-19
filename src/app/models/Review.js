const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
  {
    star_no: Number,
    content: String,
    review_status: Number,
    product_name: {
      type: String, // optional
      ref: 'Product',
    },
    account_email: {
      type: String,
      ref: 'Account',
    },
  },
  {
    timestamps: true,
  },
);

ReviewSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};
const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
