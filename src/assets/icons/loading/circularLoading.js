import React from 'react';
import { Loader } from './circularLoading.sc';
import Proptypes from 'prop-types';

const CircularLoading = ({
  width = '5rem',
  height = '5rem',
  size = '0.5rem',
  bgColor,
}) => {
  return <Loader width={width} height={height} size={size} bgColor={bgColor} />;
};
CircularLoading.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  size: Proptypes.string,
  bgColor: Proptypes.string,
};
export default CircularLoading;
