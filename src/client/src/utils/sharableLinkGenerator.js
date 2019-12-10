/* eslint-disable no-undef */
// @flow

import { REACT_APP_SAZEN_WEB_APP_PATH } from './NetworkConstants';

const EVENTS = 'events';
const VOLUNTEER_CAMPAIGNS = 'volunteercampaigns';
const DONATION_CAMPAIGNS = 'donationcampaigns';
const NGOS = 'ngos';
const MICROSITES = 'microsites';
const MEMBERSHIP_CAMPAIGNS = 'membershipCampaigns';


export const generateEventSharableUrl = (eventId) => {
    const shareUrl = `${REACT_APP_SAZEN_WEB_APP_PATH}/${EVENTS}/${eventId}?eventId=${eventId}`;
    // const shareUrl = `/sazenAppsLinks`;
    return shareUrl;
}

export const generateVolunteerCampaignSharableUrl = (volunteerCampaignId) => {
    const shareUrl = `${REACT_APP_SAZEN_WEB_APP_PATH}/${VOLUNTEER_CAMPAIGNS}/${volunteerCampaignId}?volunteerCampaignId=${volunteerCampaignId}`;
    return shareUrl;
}

export const generateDonationCampaignSharableUrl = (donationCampaignId) => {
    const shareUrl = `${REACT_APP_SAZEN_WEB_APP_PATH}/${DONATION_CAMPAIGNS}/${donationCampaignId}?donationCampaignId=${donationCampaignId}`;
    return shareUrl;
}

export const generateMicrositeSharableUrl = (ngoId) => {
    const shareUrl = `${REACT_APP_SAZEN_WEB_APP_PATH}/${NGOS}/${ngoId}/${MICROSITES}?ngoId=${ngoId}`;
    return shareUrl;
}

export const generateMembershipCampaignSharableUrl = (membershipCampaignId) => {
    const shareUrl = `${REACT_APP_SAZEN_WEB_APP_PATH}/${MEMBERSHIP_CAMPAIGNS}/${membershipCampaignId}?membershipCampaignId=${membershipCampaignId}`;
    // const shareUrl = `sazenAppsLinks`;
    return shareUrl;
}