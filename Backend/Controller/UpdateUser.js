const User = require("../Models/userSignUpModel");

const updateUser = async (req, res) => {
  try {
    const { name, email, role, userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        error: true,
        success: false,
      });
    }

    // Prepare the update payload
    const payload = {};
    if (name) payload.name = name.trim();
    if (email) payload.email = email.trim().toLowerCase();
    if (role) payload.role = role.trim();

    // Check if there is anything to update
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields to update",
        error: true,
        success: false,
      });
    }

    // Update the user based on userId and the payload
    const updated = await User.findByIdAndUpdate(userId, payload, { new: true });

    // If no user found
    if (!updated) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Send the updated user data in response
    res.status(200).json({
      data: updated,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      message: "Error in user update section",
      error: true,
      success: false,
    });
  }
};

module.exports = updateUser;
