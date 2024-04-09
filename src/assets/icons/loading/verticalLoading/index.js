import React from 'react';
import Proptypes from 'prop-types';
import { Loader } from './index.sc';

const VerticalLoading = ({
  width = '5rem',
  height = '5rem',
  size = '0.5rem',
}) => {
  return (
    <Loader
      className="loader"
      width={width}
      height={height}
      size={size}
    ></Loader>
  );
};
VerticalLoading.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  size: Proptypes.string,
};
export default VerticalLoading;
