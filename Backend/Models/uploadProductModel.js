const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productNAME: { type: String, required: true },
    brandNAME: { type: String, required: true },
    category: { type: String, required: true },
    productIMAGES: [{ url: String, public_id: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPRICE: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
