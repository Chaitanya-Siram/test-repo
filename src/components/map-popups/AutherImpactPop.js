import React from 'react';
import {
  FitContent,
  FitHorizontal,
  SecLightgray,
  SecMidBold,
  SquareBox,
} from './index.sc';
import PropTypes from 'prop-types';

const AutherImpactPop = ({ label, subLabel, isReverse, color }) => {
  return (
    <FitContent gap="0.25rem" isReverse={isReverse}>
      <SecMidBold>{label}</SecMidBold>
      <FitHorizontal gap="0.3rem">
        {color && <SquareBox background={color} />}
        <SecLightgray>{subLabel}</SecLightgray>
      </FitHorizontal>
    </FitContent>
  );
};

AutherImpactPop.propTypes = {
  label: PropTypes.string,
  subLabel: PropTypes.string,
  isReverse: PropTypes.bool,
  color: PropTypes.string,
};

export default AutherImpactPop;
