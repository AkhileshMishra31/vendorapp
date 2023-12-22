const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendShopToken = require("../utils/ShopToken");
const { isAuthenticated } = require("../middleware/auth");
const Shop = require("../model/shop");
const sendToken = require("../utils/jwtToken");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password, zipcode, phonenumber, address } = req.body;
    const SellerEmail = await Shop.findOne({ email });
    console.log(req.file);

    if (SellerEmail) {
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

    const shop = {
      name: name,
      email: email,
      address: address,
      zipCode: zipcode,
      phoneNumber: phonenumber,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(shop);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your Accunt",
        message: `Hello ${shop.name}, please click on the link to activate your Shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${shop.email} to activate your account As seller!`,
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

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phonenumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phonenumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// shop login
router.post(
  "/shop-login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      // Find the user in the database
      const shop = await Shop.findOne({ email }).select("+password");;

      // If the user does not exist, return an error
      if (!shop) {
        return next(
          new ErrorHandler("Does not find any shop please sign up", 401)
        );
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await shop.comparePassword(password);

      // If passwords match, generate a JWT token and send it in the response
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      console.error(error);
      new ErrorHandler(error.message, 500);
    }
  })
);
const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.get(
    "/getSeller",
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
      try {
        let shop = await Shop.findById(req.user.id);
        if (!user) {
          return next(new ErrorHandler("user does not exist", 500));
        }
        res.status(201).json({
          success: true,
          user: shop,
        });
      } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500));
      }
    })
  ); 

module.exports = router;
