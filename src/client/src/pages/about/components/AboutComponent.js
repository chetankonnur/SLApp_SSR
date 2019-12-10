import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchCampaigns } from "../actions/aboutActions";
import CardMedia from "@material-ui/core/Card";
import CardText from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";

class AboutComponent extends Component {
  getAllPosts = () => {
    const campaignView = this.props.posts.map(campaign => (
      <div className="col-lg-4 col-lg-offset-2">
        <Card
          style={{ padding: "20px", margin: "20px" }}
          containerstyle={{ paddingBottom: "0px !important" }}
        >
          <CardMedia
            style={{
              cursor: "pointer",
              padding: "0px 0px 0px 0px",
              boxShadow: "none"
            }}
            // onClick={this.handleCamapaignClick}
          >
            <img
              className=""
              style={{ width: "auto" }}
              src={campaign.header.bannerImages[0]}
              alt="banner"
              width="100%"
              height="235px !important"
              objectfit="cover"
            />
          </CardMedia>
          <CardText style={{ padding: "5px 10px 0px 10px", boxShadow: "none" }}>
            <div>
              <div className="row">
                <div
                // style={fullWidthCardCampaignIconStyle}
                // onClick={this.handleCamapaignClick}
                >
                  <div>{campaign.header.startDate}</div>
                </div>
                <div>
                  <div>
                    <div>{campaign.header.title}</div>
                    <div>
                      {`${campaign.header.location.addressLine1} ${campaign.header.location.city}`}
                      {campaign.header.location.shortAddress &&
                      campaign.header.location.shortAddress.length > 0
                        ? campaign.header.location.shortAddress
                        : `${campaign.header.location.shortAddress} ${campaign.header.location.city}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    ));
    return campaignView;
  };

  render() {
    return (
      <Fragment>
        <div className="col-lg-8" style={{ fontWeight: "bold", fontSize: "24px" }}>
          this is about component with API call and printing all the posts as
          list below
        </div>
        {this.getAllPosts()}
      </Fragment>
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
