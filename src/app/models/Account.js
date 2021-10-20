const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoose_delete = require('mongoose-delete');
const AccountSchema = new Schema(
  {
    password: String,
    full_name: String,
    // avatar: String,
    email: String,
    phone_number: Number,
    account_status: Number,
    accountType: Number,
    address: String,
  },
  {
    timestamps: true,
  },
);

AccountSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    });
  }
  return this;
};
AccountSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
});
AccountSchema.plugin(mongoose_delete, {
  deletedAt: true,
});
module.exports = mongoose.model('Account', AccountSchema);
