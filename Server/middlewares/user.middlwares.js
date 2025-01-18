import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

// Load Environment Vairables
configDotenv();

// verify the user is authenticated
export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        message: "Access Denied, User Not Authenticated",
      });

    // verifying the token from the cookies
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    // attach the uer information to the request object
    req.user = tokenVerified;
    next(); // Proceed to the next middlewares or function
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
