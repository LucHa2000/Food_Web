const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  product_name : String,
  unit_price:Number,
  quantity: Number,
  image: String,
  note: String,
  product_status: Number,
  list_id:{
    type: Schema.Types.ObjectId,
    ref:'List'
  },
  promotionDetails:[{
    type:Schema.Types.ObjectId,
    ref:'Promotion_detail'
  }],
  orderDetails:[{
    type:Schema.Types.ObjectId,
    ref:'Order_detail'
  }],
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:'Review'
  }]
 },{
   timestamps:true,
 });
 module.exports =  mongoose.model('Product', ProductSchema); 
