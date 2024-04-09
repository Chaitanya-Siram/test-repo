import React from 'react';
import PropTypes from 'prop-types';

const WriteIcon = ({ stroke }) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.2815L6.66101 11.9425L17.2754 1.32812"
        stroke={stroke || 'black'}
        strokeWidth="2"
      />
    </svg>
  );
};

WriteIcon.propTypes = {
  stroke: PropTypes.string,
};

export default WriteIcon;
