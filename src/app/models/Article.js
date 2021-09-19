const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: String,
    content: String,
    article_status: Number,
    image: String,
    author: String,
  },
  { timestamps: true },
);
ArticleSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};
module.exports = mongoose.model('Article', ArticleSchema);
