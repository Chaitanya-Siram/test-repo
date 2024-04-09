import React from 'react';
import PropTypes from 'prop-types';
import { FitContent, SecLightgray, SecMidBold, SecMidgray } from './index.sc';

const TopSourcePop = ({ label, subLabel, info }) => {
  return (
    <FitContent gap="0.5rem">
      <SecMidgray>{label}</SecMidgray>
      <FitContent gap="0.2rem">
        <SecLightgray>{subLabel}</SecLightgray>
        <SecMidBold>{info}</SecMidBold>
      </FitContent>
    </FitContent>
  );
};

TopSourcePop.propTypes = {
  label: PropTypes.string,
  subLabel: PropTypes.string,
  info: PropTypes.string,
};

export default TopSourcePop;
