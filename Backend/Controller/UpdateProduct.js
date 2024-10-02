const Product = require("../Models/uploadProductModel");

const updateProduct = async (req, res) => {
    try {
        const { _id, ...resBody } = req.body;   
        // Update the existing product
        console.log("id",resBody);
        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            resBody,             // Update fields
            { new: true }         // Return the updated product
        );

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updatedProduct,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while updating the product",
            error: true,
            success: false,
        });
    }
};

module.exports = updateProduct;
