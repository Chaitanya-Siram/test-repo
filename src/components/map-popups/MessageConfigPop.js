import React from 'react';
import PropTypes from 'prop-types';
import {
  ArclInfowpr,
  DesContainer,
  HorizontalStrip,
  MediatypePopwrpr,
  SecLight,
  SecLightgray,
  SecMidBold,
  StripBox,
} from './index.sc';

const MessageConfigPop = ({
  title,
  label,
  infoArray,
  subLabel,
  description,
}) => {
  return (
    <MediatypePopwrpr>
      <ArclInfowpr>
        {title && <SecMidBold>{title}</SecMidBold>}
        {description && <SecLight>{description}</SecLight>}
      </ArclInfowpr>
      <ArclInfowpr>
        {<SecLightgray>{label || ''}</SecLightgray>}
        <SecMidBold>{subLabel || ''}</SecMidBold>
      </ArclInfowpr>
      <DesContainer>
        {infoArray?.map((item, i) => (
          <StripBox key={i}>
            <HorizontalStrip backgroundColor={item.color} width={'1rem'} />
            <ArclInfowpr>
              <SecLightgray>{item.label}</SecLightgray>
              <SecMidBold>{item.subLabel}</SecMidBold>
            </ArclInfowpr>
          </StripBox>
        ))}
      </DesContainer>
    </MediatypePopwrpr>
  );
};

MessageConfigPop.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  infoArray: PropTypes.array,
  description: PropTypes.string,
};

export default MessageConfigPop;
