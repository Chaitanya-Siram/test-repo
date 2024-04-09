import React from 'react';
import PropTypes from 'prop-types';
import {
  FitContent,
  FitHorizontal,
  SecLightgray,
  SecMidBold,
  SecMidgray,
  SquareBox,
} from './index.sc';
import Triangle2 from '../../assets/icons/Triangle2';

const OutletPop = ({ title, label, subLabel, squareColor, triangleColor }) => {
  return (
    <FitContent gap="0.5rem">
      <FitHorizontal gap="0.5rem" style={{ alignItems: 'center' }}>
        {squareColor && <SquareBox background={squareColor} />}
        <SecMidgray>{title}</SecMidgray>
      </FitHorizontal>
      <FitContent gap="0.25rem">
        {label && <SecLightgray>{label}</SecLightgray>}
        <FitHorizontal gap="0.3rem" style={{ alignItems: 'center' }}>
          {subLabel && <SecMidBold>{subLabel}</SecMidBold>}
          {triangleColor && <Triangle2 fillColor={triangleColor} />}
        </FitHorizontal>
      </FitContent>
    </FitContent>
  );
};

OutletPop.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  squareColor: PropTypes.string,
  triangleColor: PropTypes.string,
};

export default OutletPop;
