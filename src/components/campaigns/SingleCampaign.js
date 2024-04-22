import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  CampaignKeywords,
  CampaigntNameInput,
  IconWrapper,
  SingleCampaignWrapper,
  TextIconWrapper,
} from './index.sc';
import Delete from '../../assets/icons/Delete';

const SingleCampaign = ({
  campaign,
  updateCampaignData,
  deleteCampaign,
  campaignsLength,
  namePlaceHolder,
  keywordsPlaceHolder,
}) => {
  const [formData, setFormData] = useState({
    name: campaign.name,
    keywords: campaign.keywords,
  });
  // const [setTimeoutId, setSetTimeoutId] = useState(null);

  const handleFormChange = (event, fieldName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: event.target.value,
    }));
    updateCampaignData(
      campaign.campaign_id,
      fieldName === 'name' ? event.target.value : formData.name,
      fieldName === 'keywords' ? event.target.value : formData.keywords
    );
  };

  return (
    <SingleCampaignWrapper>
      <TextIconWrapper>
        <CampaigntNameInput
          placeholder={namePlaceHolder}
          name="name"
          value={formData.name}
          onChange={(e) => handleFormChange(e, 'name')}
        />
        <IconWrapper
          onClick={() => deleteCampaign(campaign.campaign_id)}
          className="delete-campaign"
        >
          <Delete />
        </IconWrapper>
      </TextIconWrapper>
      <CampaignKeywords
        placeholder={keywordsPlaceHolder}
        name="keywords"
        value={formData.keywords}
        onChange={(e) => handleFormChange(e, 'keywords')}
      />
    </SingleCampaignWrapper>
  );
};

SingleCampaign.propTypes = {
  campaign: PropTypes.shape({
    campaign_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
  }).isRequired,
  updateCampaignData: PropTypes.func.isRequired,
  deleteCampaign: PropTypes.func.isRequired,
  campaignsLength: PropTypes.number.isRequired,
  namePlaceHolder: PropTypes.string,
  keywordsPlaceHolder: PropTypes.string,
};

export default SingleCampaign;
