// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardMedia from "@material-ui/core/Card";
import CardText from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
// import {
//   postCampaignLikeStatsAction,
//   postCampaignShareStatsAction
// } from "../../../actions/landingPageActions";
import SGIconComponent from "./icons/SGIconComponent";
import {
  appFontFamily,
  SG_ICON_LIKE_OUTLINE_CLASS_NAME,
  SG_ICON_LIKE_FILLED_CLASS_NAME,
  SG_ICON_SHARE_OUTLINE_CLASS_NAME,
  SG_ICON_SHARE_FILLED_CLASS_NAME,
  SG_ICON_USER_REGISTER_CLASS_NAME
} from "../../../styles/constants";
import { getShortDate, getShortMonth } from "../../../utils/dateUtility";
import {
  DEFAULT_BANNER,
  DEFAULT_LOGO
} from "../../../constants/cloudinaryPaths";
import {
  fullWidthCardNgoLogoStyle,
  fullWidthCardNgoNameStyle,
  fullWidthCardBannerImageStyle,
  fullWidthCardCampaignIconStyle,
  fullWidthCardShortDateStyle,
  fullWidthCardTitleWrapperStyle,
  fullWidthCardTitleStyle,
  fullWidthCardLocationStyle,
  fullWidthCardCardStyle,
  fullWidthCardButtonLabel,
  fullWidthCardButtonsSeperator,
  fullWidthCardCSRLogoStyle,
  fullWidthCardCsrSupportStyle
} from "../../../styles/commonStyles";

import utility from "../../../utils/utils";
const twitterHashTags = ["SociallyGood", "#BeGoodDoGood"];

class FullWidthImageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      likesText: "Like",
      isLikeButtonDisabled: false,
      likeIcon: SG_ICON_LIKE_OUTLINE_CLASS_NAME,
      shareIcon: SG_ICON_SHARE_OUTLINE_CLASS_NAME,
      storeStats: []
    };
    this.handleShareBtnClick = this.handleShareBtnClick.bind(this);
    this.handleCamapaignClick = this.handleCamapaignClick.bind(this);
    this.handleLikeBtnClick = this.handleLikeBtnClick.bind(this);
    this.handleShareBtnClickPopover = this.handleShareBtnClickPopover.bind(
      this
    );
    this.handleNGOIconClick = this.handleNGOIconClick.bind(this);
  }

  componentDidMount() {
    let likeCount = this.props.likeCounts;
    if (this.props.likeCounts === undefined) {
      likeCount = 0;
    }
    this.setState({
      likeCounts: likeCount
    });

    let shareCount = this.props.shareCounts;
    if (this.props.shareCounts === undefined) {
      shareCount = 0;
    }
    this.setState({
      shareCounts: shareCount
    });
  }

  handleShareBtnClick(event) {
    let count = this.state.shareCounts + 1;
    this.handleRequestClose();
    this.setState({
      // open: true,
      // anchorEl: event.currentTarget,
      shareCounts: count,
      shareIcon: SG_ICON_SHARE_FILLED_CLASS_NAME
    });
    const shareStats = {
      sgObjectId: this.props.campaign.header.sgObjectId,
      sgObjectType: this.props.campaign.header.campaignType,
      ngoId: this.props.campaign.header.ngo._id,
      sazenId: "null",
      shareStats: {
        sharedBy: [
          {
            sazenId: "null",
            share: "true"
          }
        ]
      }
    };
    this.props.postCampaignShareStatsAction(shareStats);
  }

  handleCamapaignClick = currentTarget => {
    // This prevents ghost click.
    window.open(this.props.campaignShareUrl, "_blank");
  };

  handleNGOIconClick = currentTarget => {
    // This prevents ghost click.
    window.open(this.props.micrositeURL, "_blank");
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleLikeBtnClick = event => {
    if (this.state.isLikeButtonDisabled === false) {
      let count = this.state.likeCounts + 1;
      let likesText = " Like";
      this.setState({
        fontWeight: "bolder",
        color: "#565656",
        background: "#cacaca",
        likeCounts: count,
        likesText: likesText,
        isLikeButtonDisabled: true,
        likeIcon: SG_ICON_LIKE_FILLED_CLASS_NAME
      });
      const likeStats = {
        sgObjectId: this.props.campaign.header.sgObjectId,
        sgObjectType: this.props.campaign.header.campaignType,
        ngoId: this.props.campaign.header.ngo._id,
        sazenId: "null",
        likeStats: {
          likedBy: [
            {
              sazenId: "null",
              like: "true"
            }
          ]
        }
      };
      const stats = this.state.storeStats.push(likeStats.sgObjectId);
      this.props.postCampaignLikeStatsAction(likeStats);
    }
  };

  handleShareBtnClickPopover(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }
  render() {
    let campaign = this.props.campaign;
    const sideBarStartDateStyle = JSON.parse(
      JSON.stringify(fullWidthCardShortDateStyle)
    );
    sideBarStartDateStyle.fontSize = "18px";
    const sideBarStartMonthStyle = JSON.parse(
      JSON.stringify(fullWidthCardShortDateStyle)
    );
    sideBarStartMonthStyle.fontSize = "12px";

  
   
    let shareDisplayNone = "";
    if (
      this.state.shareCounts === 0 ||
      this.state.shareCounts === null ||
      this.state.shareCounts === undefined
    ) {
      shareDisplayNone = "none";
    }
    let likeDisplayNone = "";
    if (
      this.state.likeCounts === 0 ||
      this.state.likeCounts === null ||
      this.state.likeCounts === undefined
    ) {
      likeDisplayNone = "none";
    }
    let ngoDetails;
    if (this.props.campaign !== undefined || this.props.campaign !== null) {
      ngoDetails = utility.getNgoDetailsByCampaign(this.props.campaign);
    }
    let csrDetails;
    if (campaign.header.csr && campaign.header.csr._id) {
      csrDetails = campaign.header.csr;
    } else {
      csrDetails = null;
    }
    return (
      <Card
        style={fullWidthCardCardStyle}
        containerstyle={{ paddingBottom: "0px !important" }}
      >
        <CardMedia
          style={{
            cursor: "pointer",
            padding: "0px 0px 0px 0px",
            boxShadow: "none"
          }}
          onClick={this.handleCamapaignClick}
        >
          <img
            className="imgForTrendsTablets"
            style={fullWidthCardBannerImageStyle}
            src={
              this.props.banner === undefined ||
              this.props.banner === null ||
              this.props.banner.length === 0
                ? DEFAULT_BANNER
                : this.props.banner
            }
            alt="banner"
            width="100%"
            height="235px !important"
            objectfit="cover"
          />
        </CardMedia>
        <CardText style={{ padding: "5px 10px 0px 10px", boxShadow: "none" }}>
          <div style={{ fontFamily: appFontFamily }}>
            <div className="row">
              <div
                style={fullWidthCardCampaignIconStyle}
                onClick={this.handleCamapaignClick}
                className="FullWidthDateCardforSmallMobile"
              >
                {this.props.campaignIcon}
                {/* <div style={fullWidthCardShortDateStyle}>
                  {this.props.campaign.header.startDate !== null
                    ? getFormatedShortDate(this.props.campaign.header.startDate)
                    : "-"}
                </div> */}
                <div style={sideBarStartDateStyle}>
                  {campaign.header.startDate !== null
                    ? getShortDate(campaign.header.startDate)
                    : ""}
                </div>
                <div style={sideBarStartMonthStyle}>
                  {campaign.header.startDate !== null
                    ? getShortMonth(campaign.header.startDate)
                    : ""}
                </div>
              </div>
              <div style={fullWidthCardTitleWrapperStyle}>
                <div>
                  <div
                    style={fullWidthCardTitleStyle}
                    onClick={this.handleCamapaignClick}
                  >
                    {this.props.campaign.header.title}
                  </div>
                  <div style={fullWidthCardLocationStyle}>
                    {/* {`${this.props.campaign.header.location.addressLine1} ${this.props.campaign.header.location.city}`} */}
                    {campaign.header.location.shortAddress &&
                    campaign.header.location.shortAddress.length > 0
                      ? campaign.header.location.shortAddress
                      : `${campaign.header.location.shortAddress} ${campaign.header.location.city}`}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 gutter-0">
                <div style={fullWidthCardCsrSupportStyle}>
                  {csrDetails ? "SUPPORTED BY" : ""}
                </div>{" "}
              </div>
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 gutter-0"
                style={fullWidthCardButtonsSeperator}
              >
                <div>
                  <img
                    alt="logo"
                    width="42"
                    height="42"
                    onClick={this.handleNGOIconClick}
                    style={fullWidthCardNgoLogoStyle}
                    src={
                      ngoDetails.logo === undefined ||
                      ngoDetails.logo === null ||
                      ngoDetails.logo.length === 0
                        ? DEFAULT_LOGO
                        : ngoDetails.logo
                    }
                  />
                  <div
                    style={fullWidthCardNgoNameStyle}
                    onClick={this.handleNGOIconClick}
                  >
                    {ngoDetails.name}
                  </div>
                </div>
                {csrDetails ? (
                  <div className="pull-right">
                    <div>
                      <img
                        alt="logo"
                        width="42"
                        height="42"
                        style={fullWidthCardCSRLogoStyle}
                        src={
                          csrDetails.logo === undefined ||
                          csrDetails.logo === null ||
                          csrDetails.logo.length === 0
                            ? DEFAULT_LOGO
                            : csrDetails.logo
                        }
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                className="campaignCardActionBar col-lg-12 col-md-12 col-sm-12 col-xs-12 gutter-0"
                style={{ margin: "18px 0 0 0px", minHeight: "35px" }}
              >
                <div
                  className="col-lg-4 col-md-4 col-sm-4 col-xs-4 gutter-0"
                  style={{ textAlign: "left" }}
                >
                  <div
                    onClick={this.handleLikeBtnClick}
                    disabled={this.state.isLikeButtonDisabled}
                  >
                    <div
                      className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <SGIconComponent
                        iconClassName={this.state.likeIcon}
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-5 col-sm-5 col-xs-5"
                      style={{
                        marginTop: "-4px",
                        display: "inline-block",
                        paddingLeft: "10px"
                      }}
                    >
                      <span style={fullWidthCardButtonLabel}>
                        {this.state.likesText}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          lineHeight: "10px",
                          color: "#787993",
                          display: `${likeDisplayNone}`,
                          fontFamily: "poppins"
                        }}
                      >
                        {this.state.likeCounts}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-4 col-md-4 col-xs-4 col-sm-4 gutter-0"
                  style={{ textAlign: "left" }}
                >
                  <div onClick={this.handleShareBtnClickPopover}>
                    <div
                      className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <SGIconComponent
                        iconClassName={this.state.shareIcon}
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-5 col-sm-5 col-xs-5"
                      style={{
                        marginTop: "-4px",
                        display: "inline-block",
                        paddingLeft: "10px"
                      }}
                    >
                      <span style={fullWidthCardButtonLabel}>Share</span>
                      <span
                        style={{
                          fontSize: "10px",
                          lineHeight: "10px",
                          color: "#787993",
                          display: `${shareDisplayNone}`,
                          fontFamily: "poppins"
                        }}
                      >
                        {this.state.shareCounts}
                      </span>
                    </div>
                  </div>
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    transformOrigin={{ horizontal: "left", vertical: "top" }}
                    onRequestClose={this.handleRequestClose}
                  >
                    <div>
                      <IconButton>
                        <FacebookShareButton
                          url={this.props.campaignShareUrl}
                          quote={this.props.campaign.header.title}
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <FacebookIcon size={32} round />
                          </div>
                        </FacebookShareButton>
                      </IconButton>
                      <IconButton>
                        <TwitterShareButton
                          url={this.props.campaignShareUrl}
                          title={this.props.campaign.header.title}
                          via="SociallyGood"
                          hashtags={twitterHashTags}
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <TwitterIcon size={32} round />
                          </div>
                        </TwitterShareButton>
                      </IconButton>
                      <IconButton>
                        <LinkedinShareButton
                          url={this.props.campaignShareUrl}
                          title={this.props.campaign.header.title}
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <LinkedinIcon size={32} round />
                          </div>
                        </LinkedinShareButton>
                      </IconButton>
                      <IconButton>
                        <WhatsappShareButton
                          url={this.props.campaignShareUrl}
                          title={this.props.campaign.header.title}
                          separator=":: "
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <WhatsappIcon size={32} round />
                          </div>
                        </WhatsappShareButton>
                      </IconButton>
                      {/* <IconButton>
                        <GooglePlusShareButton
                          url={this.props.campaignShareUrl}
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <GooglePlusIcon size={32} round />
                          </div>
                        </GooglePlusShareButton>
                      </IconButton> */}
                      <IconButton>
                        <EmailShareButton
                          subject={this.props.campaign.header.title}
                          body={this.props.campaignShareUrl}
                        >
                          <div onClick={this.handleShareBtnClick}>
                            <EmailIcon size={32} round />
                          </div>
                        </EmailShareButton>
                      </IconButton>
                      <IconButton>
                        <div onClick={this.handleRequestClose}>
                          <button
                            type="button"
                            className="close"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                      </IconButton>
                    </div>
                  </Popover>
                </div>

                <div
                  className="col-lg-4 col-md-4 col-xs-4 col-sm-4 gutter-0"
                  onClick={this.handleCamapaignClick}
                  style={{
                    textAlign: "left",
                    paddingRight: "0px",
                    paddingLeft: "0px"
                  }}
                >
                  <div onClick={this.handleCamapaignClick}>
                    <div
                      className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
                      style={{
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        top: "-6px"
                      }}
                    >
                      <SGIconComponent
                        iconClassName={SG_ICON_USER_REGISTER_CLASS_NAME}
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-6 col-sm-6 col-xs-6"
                      style={{
                        display: "inline-block",
                        paddingLeft: "10px",
                        marginTop: "-3px"
                      }}
                    >
                      <span style={fullWidthCardButtonLabel}>
                        {this.props.buttonLabel}
                      </span>
                      <span style={{ fontSize: "11px", lineHeight: "10px" }}>
                        {this.props.registrationCount &&
                        this.props.registrationCount !== 0
                          ? this.props.registrationCount
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

const mapStateToDispatch = dispatch => {
  return bindActionCreators(
    {
    //   postCampaignLikeStatsAction,
    //   postCampaignShareStatsAction
    },
    dispatch
  );
};
export default connect(null, mapStateToDispatch)(FullWidthImageCard);
