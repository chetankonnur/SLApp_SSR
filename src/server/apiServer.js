"use strict";
//Initialize Environment Variables
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./src/utils/Logger");
// const appConstants = require('./constants');
const controllers = require("./src/server/controllers");
// const ContactsJobsManager = require('./src/server/service/contactService/contactsJobsManager').getInstance();
const app = express();

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use(morgan("combined", { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

controllers.set(app);

app.get("/welcome", (req, res) => {
  const response = {
    status: "SUCCESS",
    message: "Welcome to Socially Good! "
  };
  res.json(response);
});

app.listen(process.env.API_PORT, err => {
  if (err) {
    return logger.error("error occured while listening", err);
  }
  logger.info(
    `API Sever is listening on http://localhost:${process.env.API_PORT}`
  );
});

process.on("uncaughtException", error => {
  logger.error("--- Exception -----", error);
});
