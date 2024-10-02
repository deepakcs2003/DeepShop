const userSignUpModel = require("../Models/userSignUpModel");

const allUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await userSignUpModel.find(); // Get all users

        // console.log("All users data:", users); // Log the fetched users data

        // Return the fetched users data
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users, // Send all users
        });
    } catch (err) {
        console.error("Error fetching users:", err); // Log the error for debugging
        return res.status(500).json({
            message: err.message || "Failed to fetch users",
            error: true,
            success: false,
        });
    }
};

module.exports = allUsers;
