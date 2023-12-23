  const express = require("express");
  const ErrorHandler = require("./middleware/error");
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const app = express();

  console.log("running");

  const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend server URL
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use("/", express.static("uploads"));

  // config
  if (process.env.NODE_ENV != "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

  const user = require("./controller/user");
  const shop=require("./controller/shop")

  app.use("/api/v2/user", user);
  app.use("/api/v2/shop",shop);
  app.use(ErrorHandler);

  module.exports = app;
