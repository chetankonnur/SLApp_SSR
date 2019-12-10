"use strict";

const moment = require("moment");
const winston = require("winston");
// const { LoggingWinston } = require('@google-cloud/logging-winston');
require("winston-papertrail").Papertrail;

// const loggingWinston = new LoggingWinston();
// var winstonPapertrail = new winston.transports.Papertrail({
//   host: process.env.PAPER_TRAIL_HOST,
//   port: process.env.PAPER_TRAIL_PORT,
//   level: 'debug',
//   colorize: true,
//   hostname: 'sazen-stg',
//   logFormat: function(level, message) {
//     return '[' + level + '] ' + message;
//     }
//   });

const stream = {
  write: function(message, encoding) {
    var morganMsg = "MorganStream:" + message;
    logger.info(morganMsg);
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      json: false,
      timestamp: () => {
        return moment().format("YYYY-MM-DD hh:mm:ss");
      },
      prettyPrint: true
    })
    // loggingWinston,
    //winstonPapertrail
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      json: true,
      timestamp: () => {
        return moment().format("YYYY-MM-DD hh:mm:ss");
      },
      prettyPrint: true
    })
    // loggingWinston,
    //winstonPapertrail
  ],
  exitOnError: false,
  level: "debug"
});

// winstonPapertrail.on('error', function(err) {
//   console.log('Global Exception - ', err);
// });

logger.debug("winston setup");
logger.info("winston Info log Forsetup");

const info = info => {
  logger.info(info);
};
const error = (message, error) => {
  if (error && error.stack && error.message) {
    logger.error(`${message} ${error.message}`);
  } else {
    const errorResponse = {
      error
    };
    try {
      logger.error(`${message} ${JSON.stringify(errorResponse)}`);
    } catch (e) {
      logger.error(`${message} ${errorResponse}`);
    }
  }
};
const debug = (message, debugInfo) => {
  try {
    logger.debug(`${message} ${JSON.stringify(debugInfo)}`);
  } catch (exception) {
    logger.debubg(`${message} ${exception.message}`);
  }
};
module.exports = {
  info,
  error,
  debug,
  stream
};
