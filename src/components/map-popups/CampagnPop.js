import React from 'react';
import PropTypes from 'prop-types';
import {
  CampDeswpr,
  CampaignPopwpr,
  Campinfowpr,
  HorizontalStrip,
  SecLightgray,
  SecMidBold,
  SecMidLight,
  SecMidgray,
} from './index.sc';

const CampagnPop = ({ date, firstInfo, secondInfo }) => {
  return (
    <CampaignPopwpr>
      <SecMidgray>{date}</SecMidgray>
      <CampDeswpr>
        <Campinfowpr style={{ alignItems: 'center' }}>
          <HorizontalStrip width={'0.7rem'} backgroundColor={firstInfo.color} />
          <SecLightgray>{firstInfo.label}</SecLightgray>
        </Campinfowpr>
        <Campinfowpr>
          <SecMidBold>{firstInfo.subLabel}</SecMidBold>
          <SecMidLight>{firstInfo.type}</SecMidLight>
        </Campinfowpr>
      </CampDeswpr>
      <CampDeswpr>
        <Campinfowpr style={{ alignItems: 'center' }}>
          <HorizontalStrip
            width={'0.2rem'}
            backgroundColor={secondInfo.color}
          />
          <HorizontalStrip
            width={'0.2rem'}
            backgroundColor={secondInfo.color}
          />
          <SecLightgray>{secondInfo.label}</SecLightgray>
        </Campinfowpr>
        <Campinfowpr>
          <SecMidBold>{secondInfo.subLabel}</SecMidBold>
          <SecMidLight>{secondInfo.type}</SecMidLight>
        </Campinfowpr>
      </CampDeswpr>
    </CampaignPopwpr>
  );
};

CampagnPop.propTypes = {
  date: PropTypes.string,
  firstInfo: PropTypes.object,
  secondInfo: PropTypes.object,
};

export default CampagnPop;
