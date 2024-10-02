const addToCart = require('../Models/AddToCartModel'); // Assuming the model is located here

const deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.body; // Get productId from request body
        const userId = req.user?.id; // Assuming userId is set from authentication middleware
        console.log("product id",req);
        // Ensure productId and userId are provided
        if (!productId || !userId) {
            return res.status(400).json({
                message: "Product ID and User ID are required",
                success: false,
            });
        }

        // Delete the cart item using productId and userId
        const deletedItem = await addToCart.findOneAndDelete({ productId, userId });

        // Check if the item was found and deleted
        if (!deletedItem) {
            return res.status(404).json({
                message: "Cart item not found",
                success: false,
            });
        }

        // If successful
        return res.status(200).json({
            message: "Cart item deleted successfully",
            success: true,
        });
    } catch (err) {
        // Handle errors
        return res.status(500).json({
            message: "Error deleting cart item",
            error: err.message,
            success: false,
        });
    }
};

module.exports = deleteCartItem;
