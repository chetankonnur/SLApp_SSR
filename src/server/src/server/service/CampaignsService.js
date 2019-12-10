const CampaignsDao = require("../dao/CampaignsDao");
const fetchCampaignsServices = () => {
  return new Promise((resolve, reject) => {
    CampaignsDao.fetchCampaignsDao()
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  fetchCampaignsServices
};
