const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productNAME: { type: String, required: true },        // Product name
    brandNAME: { type: String, required: true },           // Brand name
    category: { type: String, required: true },            // Category (e.g., Smartphone, TV, Refrigerator)
    price: { type: Number, required: true },               // Price
    stock: { type: Number, default: 0 },                   // Stock quantity
    color: { type: String },                                // Available color options
    weight: { type: Number },                               // Weight of the product
    features: [String],                                     // Key features
    warranty: { type: String },                             // Warranty period
    description: { type: String, required: true },         // Product description
    productIMAGES: [{ url: String, public_id: String }],   // Product images
    sellingPRICE: { type: Number, required: true },        // Selling price
    ratings: {                                              // Customer ratings and reviews
        averageRating: { type: Number, default: 0 },       // Average rating
        numberOfReviews: { type: Number, default: 0 },     // Number of reviews
        numberOfStars: { type: Number, default: 0, min: 0, max: 5 } // Number of stars (0-5)
    },
    waterResistance: { type: String },                      // Water resistance rating (e.g., IP68)
    materialUsed: { type: String },                         // Material used in the product
    performance: { type: String },                          // Performance details (e.g., processing speed, efficiency)
    aiPower: { type: Boolean, default: false },             // Whether the product has AI capabilities
    releaseDate: { type: Date },                            // Release date of the product
    environmentallyFriendly: { type: Boolean, default: false }, // Whether the product is environmentally friendly
    isiCertified: { type: Boolean, default: false },       // Whether the product has ISI certification
    countryOfOrigin: { type: String }                       // Country of origin
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
