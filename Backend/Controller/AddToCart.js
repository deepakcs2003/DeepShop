const AddToCart = require("../Models/AddToCartModel");

const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // Assuming quantity is also sent in the request body
    const correctUser = req?.user?.id; // Assuming userId is set in the request
    // console.log(quantity);
    if (!correctUser || !productId) {
      return res.status(400).json({
        message: 'Error: Please try again',
        error: true,
        success: false,
      });
    }

    // Check if the product already exists in the user's cart
    const existingCartItem = await AddToCart.findOne({ userId: correctUser, productId });

    if (existingCartItem) {
      // Product exists in the cart, so update the quantity
      existingCartItem.quantity += quantity; // Increment the quantity
      await existingCartItem.save();

      return res.status(200).json({
        message: 'Cart updated successfully',
        success: true,
      });
    } else {
      // Product does not exist, so create a new cart item
      const newCartItem = new AddToCart({
        productId,
        quantity,
        userId: correctUser,
      });

      // Save the new cart item
      await newCartItem.save();

      return res.status(201).json({
        message: 'Item added to cart successfully',
        success: true,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addCart;
