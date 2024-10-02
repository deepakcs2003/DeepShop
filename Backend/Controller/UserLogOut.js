const userLogOut = async (req, res) => {
    try {
        // Clear the authentication cookies
        res.clearCookie('authToken'); // Replace 'authToken' with your actual cookie name
        
        return res.status(200).json({
            success: true,
            error:false,
            message: "User logged out successfully",
            user: [], // Set user to an empty array or null after logout
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to log out, please try again",
            error: err.message || err,
            success: false,
        });
    }
};
module.exports = userLogOut;
