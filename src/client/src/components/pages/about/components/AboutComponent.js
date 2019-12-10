import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchCampaigns } from "../actions/aboutActions";
import SGIconComponent from "../../../common/elements/icons/SGIconComponent";
import {
  generateEventSharableUrl,
  generateVolunteerCampaignSharableUrl,
  generateDonationCampaignSharableUrl,
  generateMembershipCampaignSharableUrl
} from "../../../../utils/sharableLinkGenerator";
import {
  SG_ICON_DONATION_CLASS_NAME,
  SG_ICON_MEMBERSHIP_CLASS_NAME,
  SG_ICON_EVENT_CLASS_NAME,
  SG_ICON_VOLUNTEER_CLASS_NAME
} from "../../../../styles/constants";
import { generateMicrositeNavigationPath } from "../../../../utils/MicrositePathGenerator";
import FullWidthImageCard from "../../../common/elements/FullWidthImageCard";
import constants from "../../../../utils/appConstants";


class AboutComponent extends Component {

    

  render() {
    const campaignComponents =    this.props.posts.map((campaign, index) => {

      let campaignCard = null;

      var campaignIcon = campaign.header.campaignType.includes(
        constants.sgObjectTypes.EVENT_TYPE_NAME
      ) ? (
        <SGIconComponent iconClassName={SG_ICON_EVENT_CLASS_NAME} />
      ) : campaign.header.campaignType.includes(
          constants.sgObjectTypes.VOLUNTEER_TYPE_NAME
        ) ? (
        <SGIconComponent iconClassName={SG_ICON_VOLUNTEER_CLASS_NAME} />
      ) : campaign.header.campaignType.includes(
          constants.sgObjectTypes.DONATION_TYPE_NAME
        ) ? (
        <SGIconComponent iconClassName={SG_ICON_DONATION_CLASS_NAME} />
      ) : (
        <SGIconComponent iconClassName={SG_ICON_MEMBERSHIP_CLASS_NAME} />
      );

      const sgObjectId = campaign.header.sgObjectId;
      var campaignUrl = campaign.header.campaignType.includes(
        constants.sgObjectTypes.EVENT_TYPE_NAME
      )
        ? generateEventSharableUrl(sgObjectId)
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.VOLUNTEER_TYPE_NAME
          )
        ? generateVolunteerCampaignSharableUrl(sgObjectId)
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.DONATION_TYPE_NAME
          )
        ? generateDonationCampaignSharableUrl(sgObjectId)
        : generateMembershipCampaignSharableUrl(sgObjectId);

      var micrositeURL = campaign.header.ngo
        ? generateMicrositeNavigationPath(campaign.header.ngo._id)
        : campaignUrl;

      var buttonLabel = campaign.header.campaignType.includes(
        constants.sgObjectTypes.EVENT_TYPE_NAME
      )
        ? "Register"
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.VOLUNTEER_TYPE_NAME
          )
        ? "Volunteer"
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.DONATION_TYPE_NAME
          )
        ? "Donate"
        : "Member";

      var sgObjectType = campaign.header.campaignType.includes(
        constants.sgObjectTypes.EVENT_TYPE_NAME
      )
        ? "Event"
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.VOLUNTEER_TYPE_NAME
          )
        ? "VolunteerCampaign"
        : campaign.header.campaignType.includes(
            constants.sgObjectTypes.DONATION_TYPE_NAME
          )
        ? "DonationCampaign"
        : "MembershipCampaign";

      let likeCounts;
      let shareCounts;
      let registrationCount;
      if (campaign.campaignStats) {
        likeCounts = campaign.campaignStats.likeCount;
        shareCounts = campaign.campaignStats.shareCount;
        registrationCount = campaign.campaignStats.registrationCount;
      }
      campaignCard = (
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-xs-12  col-sm-offset-0 col-md-offset-0 col-lg-offset-0"
          key={index}
          style={{ marginBottom: "20px" }}
        >
          <FullWidthImageCard
            sgObjectType={sgObjectType}
            campaign={campaign}
            campaignShareUrl={campaignUrl}
            buttonLabel={buttonLabel}
            likeCounts={likeCounts}
            shareCounts={shareCounts}
            registrationCount={registrationCount}
            campaignIcon={campaignIcon}
            banner={campaign.header.bannerImages[0]}
            micrositeURL={micrositeURL}
          />
        </div>
      );
      return campaignCard;
       
      });
    return (
      // <Fragment>
      //   <div className="col-lg-8" style={{ fontWeight: "bold", fontSize: "24px" }}>
      //     this is about component with API call and printing all the posts as
      //     list below
      //   </div>
      //   {/* {this.getAllPosts()} */}
      //   {campaignComponents}
      // </Fragment>
      <div
      className="container-fluid"
      style={{
        paddingTop: "20px",
        backgroundColor: "#F5F4F8",
        paddingBottom: "100px"
      }}
    >
      <div
        className="col-lg-10 col-sm-12 col-xs-12 col-md-10 col-lg-offset-1 col-md-offset-1 noPaddingforColumn"
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          paddingRight: "0px"
        }}
      >
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <span style={{ fontSize: "24px", color: "#313131" }}>
            Trending now
          </span>
        </div>
        <div
          className="col-lg-3 col-md-4 col-sm-4 col-xs-12 pull-right trendingCampaignsMobile"
          style={{}}
        >
          {/* <SGSearchBarComponent
            onChange={this.onChange}
            value={this.state.searchText}
            onRequestSearch={this.onRequestSearch}
            onCancelSearch={this.onCancelSearch}
          /> */}
        </div>
      </div>

      <div
        className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1"
        style={{
          clear: "both",
          marginBottom: "15px",
          marginTop: "5px",
          paddingLeft: "0px",
          paddingRight: "0px"
        }}
      >
        {campaignComponents}
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.about.posts
  };
};

AboutComponent.fetchData = fetchCampaigns;

export default connect(mapStateToProps, null)(AboutComponent);
