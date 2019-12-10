const axios = require("axios");
const CampaignsService = require("../../service/CampaignsService");

module.exports.set = app => {
  app.get("/campaigns", (req, res) => {
    console.log('coming in controoller');
    
    CampaignsService.fetchCampaignsServices()
      .then(response => {
        res.json(response);
      })
      .catch(error => res.json(error));
  });
};
