require("@babel/register")({
  presets: ["@babel/preset-env"]
});

const express = require('express');
const path = require('path');

const requestHandler = require('./requestHandler');
const app = express();

//static files nd build file reference
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use(express.static(path.join(__dirname, '../../../../build')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//for server side rendering
app.use(requestHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Notdff Found');
  err.status = 404;
  next(err);
});

module.exports = app;
