const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promotion_detailSchema = new Schema({
    promotion_rate: Number,
    quantity : Number,
      },{timestamps: true});



const Promotion_detail=  mongoose.model('Promotion_detail',  Promotion_detailSchema); 
 
module.exports =  Promotion_detail
    

