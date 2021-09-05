const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const AccountSchema = new Schema({
    password: String,
    full_name: String,
    email : String,
    account_status:Number, 
    account_type: Number,

},{timestamps:true});
module.exports =  mongoose.model('Account', AccountSchema)
