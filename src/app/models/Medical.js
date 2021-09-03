// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const Promotion_detailschema = new Schema({
//     promotion_rate: Number,
//     quantity : Number,
//       },{timestamps: true});

// const Order_detailschema = new Schema({
// 	quantity: Number,
// 	unit_price: Number,
//    promotion_rate: Number
// })
// const Promotionschema = new Schema({
//     promotion_name:String,
//     start_date : Date,
//     end_date:Date,
//     promotion_status: Number,
//    note: String,
//    promotionDetails : [Promotion_detailschema]
// },{timestamps: true})

// const Articleschema = new Schema({
    
//         title : String,
//         content: String,
//         article_status:Number,
    
// },{timestamps: true});

// const Orderschema = new Schema ({
// 			order_status : Number,
// 			note : String,
// 			delivery_address : String
// },{timestamps:true})



// const Reviewschema = new Schema({
//   review_date: Date,
//   star_no : Number,
//   content : String,
//   review_status :Number,
// },{
//   timestamps: true
// });

// const Accountschema = new Schema({
//     password: String,
//     full_name: String,
//     email : String,
//     phone_number : String,
//     account_status:Number, 
//     account_type: Number,
//     reviews : [Reviewschema],
//     orders: [Orderschema],
//     articles: [Articleschema]


// },{timestamps:true});

// const Account_Typeschema = new Schema({
//     type_name: String,
//     accounts : [Accountschema]
// })
// const Productschema1 = new Schema({
//   product_name : String,
//   unit_price:Number,
//   quantity: Number,
//   image: String,
//   noted: String,
//   product_status: Number,
// })
// const Productschema = new Schema({
//   Productschema1,
//   promotionDetails:[Promotion_detailschema],
//   orderDetails:[Order_detailschema],
//   reviews:[Reviewschema]
   
//  },{
//    timestamps:true,
//  }
//  );
 
// const Listschema = new Schema({
//  list_name : String,
//  products: [Productschema1],
// },{
//   timestamps:true,

// }
// );//luoc do


// const List=  mongoose.model('List', Listschema); 
// const Product=  mongoose.model('Product', Productschema); 
// const Account=  mongoose.model('Account', Accountschema); 
// const Promotion=  mongoose.model('Promotion', Promotionschema); 
// const Account_Type=  mongoose.model('Account_Type', Account_Typeschema); 
// module.exports = {
//     'List':  List,  
//     'Product': Product,
//     'Account': Account,
//     'Promotion': Promotion,
//     'Account_Type': Account_Type
// }
