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
        // console.log("body data", req.body);

        const { productNAME, brandNAME, category, productIMAGES, description, price, sellingPRICE } = req.body;

        // console.log("productname",productNAME);
        // Create a new product instance
        const newProduct = new Product({
            productNAME,        // Adjusted to match frontend data
            brandNAME,          // Adjusted to match frontend data
            category,
            productIMAGES: productIMAGES || [], // Ensure it's an array
            description,
            price,
            sellingPRICE        // Adjusted to match frontend data
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
