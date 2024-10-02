const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addToCartSchema = new Schema({
  productId:String,
  quantity:Number,
  userId:String
});

module.exports = mongoose.model('addToCart', addToCartSchema);
