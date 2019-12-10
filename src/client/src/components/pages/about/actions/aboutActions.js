import { HTTPRequestHandler } from "../../../../utils/commonRequires";

export const fetchCampaigns = params => {
  return new Promise((resolve, reject) => {
    const fetchCampaignsUrl = "https://sazendev.sevagarden.org/api/campaigns";
    HTTPRequestHandler.get(fetchCampaignsUrl)
      .then(response => {
        resolve({
          about: {
            posts: response.data.campaigns
          }
        });
      })
      .catch(error => {
        console.log("Error while fetching posts from network", error);
        reject(null);
      });
  });
};
