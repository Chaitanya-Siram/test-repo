import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  AdvancedComponentWrapper,
  // GenerateButton,
  GenerateButtonWrapper,
} from './index.sc';
// import TabComponent from '../../../../campaign-tabs';
import Campaigns from '../../../../campaigns';
import PropTypes from 'prop-types';
import { Button } from '../../../../button';
import { theme } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';

export const campaignInitial = [];
// Array.from({ length: 0 }, (_, index) => {
//   return {
//     campaign_id: new Date().getTime() + index,
//     name: '',
//     keywords: '',
//   };
// });

const Advanced = ({
  handler,
  tabKeywords: keywords = {},
  handleUpdates,
  handleSubmit,
  setStoringKeywords = () => { },
}) => {
  const { dashboardType } = useParams();

  const [campaignData, setCampaignData] = useState(
    keywords?.advancedKeywords || campaignInitial
  );

  useEffect(() => {
    setCampaignData(keywords?.advancedKeywords?.slice(0, 5) || campaignInitial);
    // setStoringKeywords(
    //   keywords?.advancedKeywords?.slice(0, 5) || campaignInitial
    // );
  }, [keywords?.advancedKeywords]);

  const handleCampaignData = (campaignData) => {
    setCampaignData(campaignData);
    handleUpdates && handleUpdates({ campaignData });
  };

  const btnStyle = {
    width: '6.6rem',
    height: '2.75rem',
    borderRadius: '0.313rem',
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const disabledStyle = {
    background: '#C3C7D9',
    color: theme[selectedTheme].logoText,
    cursor: 'not-allowed',
  };
  return (
    <AdvancedComponentWrapper>
      {/* <TabComponent /> */}
      <Campaigns
        label={
          dashboardType === 'sentiments'
            ? 'Choose Sentiments'
            : dashboardType === 'primpact'
              ? 'PR Campaign Names'
              : dashboardType === 'congruence'
                ? 'Brand Name'
                : 'Campaign Name'
        }
        namePlaceHolder={
          dashboardType === 'congruence'
            ? 'Brand Communication name'
            : 'Enter Campaign name'
        }
        keywordsPlaceHolder={
          dashboardType === 'congruence'
            ? 'Enter specific keywords for Brand Message'
            : 'Enter specific keywords for Campaign'
        }
        campaignData={campaignData}
        handleCampaignData={handleCampaignData}
      />
      <GenerateButtonWrapper>
        {/* <GenerateButton
          disabled={campaignData.length === 0}
          onClick={() => handler(campaignData)}
        >
          Generate
        </GenerateButton> */}
        <Button
          title={'Generate'}
          coachMarkId='coach-campaign-generate-btn-wrp'
          backgroundColor={theme[selectedTheme].primary}
          color={theme[selectedTheme].logoText}
          onClick={() => handleSubmit({ campaignData })}
          btnStyle={btnStyle}
          disable={!campaignData?.every((x) => x.name?.length > 0)}
          disableStyle={disabledStyle}
        />
      </GenerateButtonWrapper>
    </AdvancedComponentWrapper>
  );
};

Advanced.propTypes = {
  handler: PropTypes.func,
  tabKeywords: PropTypes.object,
  handleUpdates: PropTypes.func,
  handleSubmit: PropTypes.func,
  setStoringKeywords: PropTypes.func,
};

export default Advanced;
