const addToCart = require('../Models/AddToCartModel'); // Assuming this is your add to cart model
const Product = require('../Models/uploadProductModel'); // Assuming this is your product model

const allCartItem = async (req, res) => {
    try {
        const userId = req?.user?.id; // Assuming userId is set in the request
        
        // Find all cart items for the specified user
        const cartItems = await addToCart.find({ userId }).populate('productId');

        // If no cart items are found
        if (!cartItems.length) {
            return res.status(404).json({
                message: "No items in the cart",
                error: true,
                success: false,
            });
        }

        // Fetch product details and construct the response
        const populatedCartItems = await Promise.all(cartItems.map(async (cartItem) => {
            const product = await Product.findById(cartItem.productId);
            return {
                productId: cartItem.productId,
                productName: product.productNAME,
                brandName: product.brandNAME,
                category: product.category,
                images: product.productIMAGES,
                description: product.description,
                price: product.price,
                sellingPrice: product.sellingPRICE,
                quantity: cartItem.quantity
            };
        }));

        // Respond with the cart items and product details
        return res.status(200).json({
            message: "Cart items retrieved successfully",
            success: true,
            cartItems: populatedCartItems,
        });
    } catch (err) {
        return res.status(400).json({
            message: "Error retrieving cart items",
            error: err.message,
            success: false,
        });
    }
};

module.exports = allCartItem;
