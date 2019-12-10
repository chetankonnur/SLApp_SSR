const CampaignController = require("./campaignsController/CampaignsController");

module.exports.set = function(app) {
  CampaignController.set(app);
};
