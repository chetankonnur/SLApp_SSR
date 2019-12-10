const axios = require('axios');
const async = require('async');


class HTTPRequestHandler {
  constructor() {
    const service = axios.create({
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  updateRequestHeaders() {
    this.service.defaults.headers.post['userId'] = '';
    this.service.defaults.headers.post['authToken'] = '';
    this.service.defaults.headers.post['ngoId'] = '';
  }
  // Async retry try it 
  handleError(error) {
    if(error.response) {
      switch (error.response.status) {
        case 401: //Unauthorized
          
          break;
        case 404: //Host unreachable
          break;
        case 502: //Bad Gateway
          
          break;
        case 500: // Service Failure
        
          break;
        case 503: //Service Unavailable
          break;
        default:
          
          break;
      }
    }
  }
    
  redirectTo = (document, path) => {
    document.location = path
  }

  get = (path) => {
    return new Promise((resolve, reject) => {
      this.service.get(path).then(
        (response) => {resolve(response)}
      ).catch(error => reject(error));
    });
  }

  post = (path, payload) => {
    return new Promise((resolve, reject) => {
      this.service.request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  put = (path, payload) => {
    return new Promise((resolve, reject) => {
      this.service.request({
        method: 'PUT',
        url: path,
        responseType: 'json',
        data: payload
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  patch = (path, payload) => {
    return new Promise((resolve, reject) => {
      async.retry({ times: 3, interval: 1000 }, (callback, results) => {
        this.service.request({
          method: 'PATCH',
          url: path,
          responseType: 'json',
          data: payload
        })
          .then((response) => {
            callback(response);
          })
          .catch((error) => {
            this.handleError(error);
            callback(error);
          });
      }, (err, result) => {
        if (err !== null) {
          resolve({ status: 'Success', message: 'Api Success' });
        } else {
          reject({ status: 'Fail', message: 'Api Fail' });
        }
    });
    });
  }
}


const requestHandler = new HTTPRequestHandler();

export const HttpRequestHandler = {
  requestHandler
};