import React from 'react';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  AddCampaignText,
  AddCampaignWrapper,
  CampaignsHeader,
  CampaignsWrapper,
  DisplayCampaigns,
  HeaderText,
} from './index.sc';
import Plus from '../../assets/icons/Plus';
import SingleCampaign from './SingleCampaign';
import { useParams } from 'react-router-dom';
import SentimemtsCampaign from './SentimemtsCampaign';

const Campaigns = ({
  label,
  namePlaceHolder,
  keywordsPlaceHolder,
  campaignData: campaigns = [],
  handleCampaignData = () => { },
}) => {
  const { dashboardType } = useParams();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  // Update the campaigns array to use the useState hook
  // const [campaigns, setCampaigns] = useState(
  //   keywords || [
  //     {
  //       campaign_id: new Date().getTime(),
  //       name: '',
  //       keywords: '',
  //     },
  //   ]
  // );

  // Implement functions to add a new campaign and update the campaign's name and keywords
  const addNewCampaign = () => {
    const newCampaign = {
      campaign_id: new Date().getTime(),
      name: '',
      keywords: '',
    };

    // Update the campaigns array with the new campaign object
    handleCampaignData([...campaigns, newCampaign]);
  };

  const updateCampaignData = (campaignId, name, keywords) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.campaign_id === campaignId) {
        return { ...campaign, name, keywords };
      }
      return campaign;
    });

    // Update the campaigns array with the updated campaign data
    handleCampaignData(updatedCampaigns);
  };

  // Delete campaign function
  const deleteCampaign = (campaignId) => {
    // Update the capmaigns by filtering the deleted camapign
    handleCampaignData(
      campaigns.filter((campaign) => campaign.campaign_id !== campaignId)
    );
  };

  return (
    <CampaignsWrapper>
      <CampaignsHeader>
        <HeaderText>{label}</HeaderText>
        {/* {dashboardType !== 'sentiments' && (
          <AddCampaignWrapper
            className={campaigns.length >= 5 ? 'disabled' : ''}
            onClick={addNewCampaign}
          >
            <Plus
              width="1.14rem"
              height="1.14rem"
              color={theme[selectedTheme].primary}
            />
            <AddCampaignText>Add Campaign</AddCampaignText>
          </AddCampaignWrapper>
        )} */}
      </CampaignsHeader>
      <DisplayCampaigns>
        {dashboardType === 'sentiments' ? (
          <SentimemtsCampaign />
        ) : (
          <>
            {campaigns.map((campaign) => (
              <SingleCampaign
                key={campaign.campaign_id}
                campaign={campaign}
                updateCampaignData={updateCampaignData}
                deleteCampaign={deleteCampaign}
                campaignsLength={campaigns.length}
                namePlaceHolder={namePlaceHolder}
                keywordsPlaceHolder={keywordsPlaceHolder}
              />
            ))}
            <AddCampaignWrapper
              isVisible={campaigns.length < 5}
              onClick={addNewCampaign}
              id='coach-add-campaign-wrapper'
            >
              <Plus
                width="1.14rem"
                height="1.14rem"
                color={theme[selectedTheme].primary}
              />
              <AddCampaignText>Add New</AddCampaignText>
            </AddCampaignWrapper>
          </>
        )}
      </DisplayCampaigns>
    </CampaignsWrapper>
  );
};

Campaigns.propTypes = {
  label: PropTypes.string.isRequired,
  namePlaceHolder: PropTypes.string.isRequired,
  keywordsPlaceHolder: PropTypes.string.isRequired,
  campaignData: PropTypes.array,
  handleCampaignData: PropTypes.func,
};

export default Campaigns;
