import React from 'react';
import Proptypes from 'prop-types';

const Plus = ({
  width = '1.15rem',
  height = '1.15rem',
  color = '#FFFFFF',
  strokeWidth = '2',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 7.54199V27.3753"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.58301 17.4587H27.4163"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Plus.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  color: Proptypes.string,
  strokeWidth: Proptypes.string,
};

export default Plus;
