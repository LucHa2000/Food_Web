const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
   title: String,
   conte
  },
  { timestamps: true },
);
module.exports = mongoose.model('Article', ArticleSchema);
