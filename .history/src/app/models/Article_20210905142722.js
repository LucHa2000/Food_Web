const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    password: String,
    full_name: String,
    email: String,
    account_status: Number,
    accountType: Number,
  },
  { timestamps: true },
);
module.exports = mongoose.model('Article', AccountSchema);
