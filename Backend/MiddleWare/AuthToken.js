const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token
const authToken = async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token = req.cookies?.deepaknediya || req.headers['authorization']?.split(' ')[1];
    
    // console.log("Token is here: ", token);

    if (!token) {
      // If no token is provided, respond with unauthorized status
      return res.status(401).json({
        success: false,
        message: "Token is not provided"
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        console.log("Token verification error: ", err);
        return res.status(401).json({
          success: false,
          message: "Invalid Token"
        });
      }

      // Attach decoded token data to req.user
      req.user= decoded;
      next();
    });
  } catch (err) {
    // Catch any unexpected errors and respond with unauthorized status
    console.error("Auth Error: ", err);
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

module.exports = authToken;
