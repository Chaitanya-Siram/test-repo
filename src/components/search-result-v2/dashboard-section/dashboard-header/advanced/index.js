import React from 'react';
import { useParams } from 'react-router-dom';
import {
  AdvancedComponentWrapper,
  GenerateButton,
  GenerateButtonWrapper,
} from './index.sc';
import TabComponent from '../../../../campaign-tabs';
import Campaigns from '../../../../campaigns';

const Advanced = () => {
  const { dashboardType } = useParams();
  console.log(dashboardType, 'dashboard');

  return (
    <AdvancedComponentWrapper>
      <TabComponent />
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
      />
      <GenerateButtonWrapper>
        <GenerateButton>Generate</GenerateButton>
      </GenerateButtonWrapper>
    </AdvancedComponentWrapper>
  );
};

Advanced.propTypes = {};

export default Advanced;
