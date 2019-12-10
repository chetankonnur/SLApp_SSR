'use strict';
const axios = require('axios');
const logger = require('./Logger');

function callGetAPI(url, config) {
    return new Promise(function (resolve, reject) {
      axios.get(url, config)
      .then(response => {
        resolve(response.data);
        //logger.debug('data from server: ', response.data);
      })
      .catch(error => {
        const errorMsgPlain = (error.response && error.response.data)? error.response.data: '';
        let errorMsg = ''
        try {
          errorMsg = JSON.stringify(errorMsgPlain);
        } catch(e) {
          errorMsg = ''
        }
        // logger.error('request from server failed: ', errorMsg);
        reject(errorMsg);
      });
    });
}

function callPostAPIReturnWithheader(url, body, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, body, config)
    .then(response => {
      //logger.debug('data from server: ', response.data);
      resolve(response);
    })
    .catch(error => {
      const errorMsgPlain = (error.response && error.response.data)? error.response.data: '';
        let errorMsg = ''
        try {
          errorMsg = JSON.stringify(errorMsgPlain);
        } catch(e) {
          errorMsg = ''
        }
        // logger.error('request from server failed: ', errorMsg);
        reject(errorMsg);
    });
  });
}


function callPostAPI(url, body, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, body, config)
    .then(response => {
      //logger.debug('data from server: ', response.data);
      resolve(response.data);
    })
    .catch(error => {
      const errorMsgPlain = (error.response && error.response.data)? error.response.data: '';
        let errorMsg = ''
        try {
          errorMsg = JSON.stringify(errorMsgPlain);
        } catch(e) {
          errorMsg = ''
        }
        // logger.error('request from server failed: ', errorMsg);
        reject(errorMsg);
    });
  });
}

function callPutAPI(url, body) {
  return new Promise((resolve, reject) => {
    axios.put(url, body)
    .then(response => {
      //logger.debug('data from server: ', response.data);
      resolve(response.data);
    })
    .catch(error => {
      const errorMsgPlain = (error.response && error.response.data)? error.response.data: '';
        let errorMsg = ''
        try {
          errorMsg = JSON.stringify(errorMsgPlain);
        } catch(e) {
          errorMsg = ''
        }
        // logger.error('request from server failed: ', errorMsg);
        reject(errorMsg);
    });
  });
}

module.exports = {
  callGetAPI,
  callPostAPI,
  callPutAPI,
  callPostAPIReturnWithheader
};
