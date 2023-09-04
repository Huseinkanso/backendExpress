const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // token have user id so we decode the token to get the id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from token
      // -password   exclude the password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("error not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("no token not authorized");
  }
});

module.exports={protect}
