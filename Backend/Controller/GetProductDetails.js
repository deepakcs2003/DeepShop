const Product = require("../Models/uploadProductModel");

const getProductDetails = async (req, res) => {
  try {
    // Get the id from req.params (not req.body)
    const { id } = req.body;
    
    console.log("product id", id);

    // Fetch product by id
    const product = await Product.findById(id); // Use 'id' not '_id'

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    // Respond with product details
    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      error: false,
      data: product,
    });
  } catch (err) {
    console.log("Error fetching product:", err);

    // Respond with error details
    return res.status(400).json({
      message: "Error fetching product",
      error: true,
      success: false,
      details: err.message, // Use 'details' for more clarity
    });
  }
};

module.exports = getProductDetails;
