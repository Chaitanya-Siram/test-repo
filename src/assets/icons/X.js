import React from 'react';
import Proptypes from 'prop-types';

const X = ({ color = '#656B8A', size = '34', strokeWidth = '1' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.1602 6L6.16016 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.16016 6L18.1602 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

X.propTypes = {
  color: Proptypes.string,
  size: Proptypes.string || Proptypes.number || undefined,
  strokeWidth: Proptypes.string,
};

export default X;
