import React from 'react';
import PropTypes from 'prop-types';
import {
  ArclInfowpr,
  BigMidBold,
  BigMiddleGray,
  DesContainer,
  HorizontalStrip,
  MediatypePopwrpr,
  MidBold,
  MidLight,
  StripBox,
} from './index.sc';

const Mediatypepop = ({ title, label, infoArray, subLabel }) => {
  return (
    <MediatypePopwrpr>
      <ArclInfowpr>
        <MidBold>{title}</MidBold>
      </ArclInfowpr>
      <ArclInfowpr>
        <MidLight>{label}</MidLight>
        <BigMidBold>{subLabel}</BigMidBold>
      </ArclInfowpr>
      <DesContainer>
        {infoArray?.map((item, i) => (
          <StripBox key={i}>
            <HorizontalStrip backgroundColor={item.color} width={'1rem'} />
            <ArclInfowpr>
              <BigMiddleGray>{item.label}</BigMiddleGray>
              <BigMidBold>{item.subLabel}</BigMidBold>
            </ArclInfowpr>
          </StripBox>
        ))}
      </DesContainer>
    </MediatypePopwrpr>
  );
};

Mediatypepop.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  infoArray: PropTypes.array,
};

export default Mediatypepop;
