import React from 'react';
import Proptypes from 'prop-types';

const ChevronRight = ({
  color = '#675EF2',
  width = '0.938rem',
  height = '0.938rem',
  strokeWidth = '2',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.17822 11.543L9.67822 7.04297L5.17822 2.54297"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ChevronRight.propTypes = {
  color: Proptypes.string,
  height: Proptypes.string,
  width: Proptypes.string,
  strokeWidth: Proptypes.string,
};

export default ChevronRight;
