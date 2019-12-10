const axios = require("axios");
const CampaignsService = require("../../service/CampaignsService");

module.exports.set = app => {

  app.get("/campaigns", (req, res) => {    
    CampaignsService.fetchCampaignsServices()
      .then(response => {
        res.json(response);
      })
      .catch(error => res.json(error));
  });

  // app.get("/campaigns/html", (req, res) => {
  //   const { ngoId, apiKey } = req.query;
  //   console.log("ngoId---", ngoId);
  //   console.log('req.query-----',req.query);
  //   console.log("apiKey---", apiKey);
  //   axios
  //     .get(`http://localhost:5000/about?ngoId=${ngoId}&apiKey=${apiKey}`)
  //     .then(response => {
  //       console.log("response------", response);
  //       res.json({ html: response.data });
  //     })
  //     .catch(error => {
  //       console.log("failed---------", error);
  //       res.send(error);
  //     });
  // });

};
