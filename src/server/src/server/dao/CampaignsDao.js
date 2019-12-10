const serviceInvoker = require("../../utils/ServiceInvoker");

const fetchCampaignsDao = queryParams => {
  return new Promise((resolve, reject) => {
    let config = {
      headers: {
        "x-api-key": process.env.SG_SERVICES_API_KEY
      }
    };
    let apiPath = `${process.env.SGSERVICES_API_BASE_PATH}/campaigns`;
    serviceInvoker
      .callGetAPI(`${apiPath}`, config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  fetchCampaignsDao
};
