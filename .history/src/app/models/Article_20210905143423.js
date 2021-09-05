const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
   title: String,
   content : String,
   article_status: String,
   image : String,
   author :String,
   {}
  },
  { timestamps: true },
);
module.exports = mongoose.model('Article', ArticleSchema);
