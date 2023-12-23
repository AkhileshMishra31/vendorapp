const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to Continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

exports.isAuthenticatedSeller = catchAsyncError(async (req, res, next) => {
  console.log("req.cookies", req.cookies);
  const { seller_token } = req.cookies;
  console.log("Selller token" ,req.cookies.seller_token);
  if (!seller_token) {
    return next(new ErrorHandler("Please login to Continue", 401));
  }
  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
  req.shop = await Shop.findById(decoded.id);
  next();
});
