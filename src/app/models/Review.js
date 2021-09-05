const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reviewschema = new Schema(
  {
    review_date: Date,
    star_no: Number,
    content: String,
    review_status: Number,
  },
  {
    timestamps: true,
  },
);
const Review = mongoose.model('Review', Reviewschema);
module.exports = Review;
