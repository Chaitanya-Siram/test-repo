import React from 'react';
import Proptypes from 'prop-types';
const ChevronDown = ({ color = 'white', size = '21px' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.63379 8L10.6338 13L15.6338 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ChevronDown.propTypes = {
  color: Proptypes.string,
  size: Proptypes.string,
};

export default ChevronDown;
