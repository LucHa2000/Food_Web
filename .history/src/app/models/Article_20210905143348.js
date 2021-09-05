const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
   title: String,
   content : String,
   article_content: String,
  },
  { timestamps: true },
);
module.exports = mongoose.model('Article', ArticleSchema);
