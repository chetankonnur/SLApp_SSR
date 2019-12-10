function getNgoDetailsByCampaign(campaign) {
  if (
    campaign.header.collaborations &&
    campaign.header.collaborations.length > 0 &&
    campaign.header.collaborations[0].ngoCollaboration &&
    campaign.header.collaborations[0].ngoCollaboration.listingNgo
  ) {
    return campaign.header.collaborations[0].ngoCollaboration.listingNgo;
  }
  return campaign.header.ngo;
}

export default {
  getNgoDetailsByCampaign
};
