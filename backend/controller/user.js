const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    console.log(userEmail);
    console.log(req.file);

    if (userEmail) {
      const fileName = req.file.filename;
      const fileUrl = `uploads/${fileName}`;
      fs.unlink(fileUrl, (err) => {
        if (err) {
          res.status(500).json({
            message: "File can not be uploaded",
          });
        } else {
          console.log("File deleted successfully");
        }
      });
      return next(new ErrorHandler("User already exist", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = fileName;

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Accunt",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      // varify the
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("invalid Token", 500));
      }

      const { name, email, password, avatar } = newUser;
      console.log(email);
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("user already exists", 500));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      console.log(user);
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("user does not exist", 500));
      }
      res.status(201).json({
        success: true,
        user: user,
      });
    } catch (error) {
      return next(new ErrorHandler("Something went wrong", 500));
    }
  })
);

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      // Clear the token cookie
      res.cookie("token", null, {
        expires: new Date(0), // Setting expires to a past date to immediately expire the cookie
        httpOnly: true,
      });

      // Send a JSON response indicating successful logout
      res.status(200).json({
        success: true,
        message: "Logout Successfully",
      });
    } catch (error) {
      // If an error occurs, handle it by passing it to the error handler middleware
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
