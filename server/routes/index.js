const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

/**
 * APP ROUTES
 */
const userRoutes = require("./api/user");
const uploadRoutes = require("./api/upload");

module.exports = function (app, io) {
  let whitelist = [];
  let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: true, credentials: true };
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  /**
   * THIRD-PARTY MIDDLEWARES
   */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors(corsOptionsDelegate));

  // pass io instance into app instance
  app.io = io;
  /**
   * SERVE REACT APPS IF SERVER IS NOT STANDALONE
   */
  // const appPath = path.join(__dirname, "../../estorebkh", "build");
  // app.use(express.static(appPath));
  // app.get("/", function(req, res) {
  // 	res.sendFile(path.resolve(appPath, "index.html"));
  // });

  /**
   * favicon.ico issue
   */
  app.get("/favicon.ico", (req, res) => res.sendStatus(204));
  app.get("/", (req, res) => {
    res.json({ message: `BOILERPLATE SERVER RUNNING` });
  });

  /**
   * API ROUTES SET UP
   */
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/upload", uploadRoutes);
};
