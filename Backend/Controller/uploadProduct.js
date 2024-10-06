const Product = require("../Models/uploadProductModel"); // Adjust the path to where your Product model is located

const uploadProduct = async (req, res) => {
    try {
        // Check for admin role
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Permission denied: Only admins can upload products',
            });
        }

        // Extract product data from the request body
        const { 
            productNAME, 
            brandNAME, 
            category, 
            productIMAGES, 
            description, 
            price, 
            sellingPRICE,
            stock,
            color,
            weight,
            features,
            warranty,
            waterResistance,
            materialUsed,
            performance,
            aiPower,
            environmentallyFriendly,
            isiCertified,
            countryOfOrigin
        } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            productNAME,                     // Product name
            brandNAME,                       // Brand name
            category,                        // Category
            productIMAGES: productIMAGES || [], // Ensure it's an array
            description,                     // Product description
            price,                           // Price
            sellingPRICE,                    // Selling price
            stock: stock || 0,               // Stock quantity (default to 0 if not provided)
            color,                           // Available color options
            weight,                          // Weight of the product
            features: features || [],        // Key features (default to empty array if not provided)
            warranty,                        // Warranty period
            waterResistance,                 // Water resistance rating
            materialUsed,                    // Material used in the product
            performance,                     // Performance details
            aiPower: aiPower || false,      // AI capabilities (default to false)
            environmentallyFriendly: environmentallyFriendly || false, // Environmental friendliness
            isiCertified: isiCertified || false, // ISI certification
            countryOfOrigin                  // Country of origin
        });

        // Save the product to the database
        await newProduct.save();

        // Respond with success
        res.status(201).json({
            message: 'Product uploaded successfully',
            error: false,
            success: true,
            data: newProduct,
        });
    } catch (err) {
        // Handle errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = uploadProduct;
