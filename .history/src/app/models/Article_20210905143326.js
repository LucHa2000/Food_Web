const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
   tit
  },
  { timestamps: true },
);
module.exports = mongoose.model('Article', ArticleSchema);
