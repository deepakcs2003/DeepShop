const addToCart = require('../Models/AddToCartModel'); // Assuming this is your add to cart model

const addToCartCount = async (req, res) => {
    try {
        const userId = req?.user?.id; // Assuming the user is authenticated and userId is available in the request

        // Find all cart items for the specified user
        const cartItems = await addToCart.find({ userId });

        // If no cart items are found
        if (!cartItems.length) {
            return res.status(404).json({
                message: "No items in the cart",
                error: true,
                success: false,
                totalQuantity: 0, // Return 0 if the cart is empty
            });
        }

        // Calculate total quantity by summing up the quantity of each cart item
        const totalQuantity = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

        // Respond with the total quantity of items in the cart
        return res.status(200).json({
            message: "Total quantity of items in the cart",
            success: true,
            totalQuantity,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error calculating cart quantity",
            error: err.message,
            success: false,
        });
    }
};

module.exports = addToCartCount;
