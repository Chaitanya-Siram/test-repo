import React from 'react';
import Proptypes from 'prop-types';

const CheckboxIcon = ({
  width = '25',
  height = '25',
  color = 'white',
  borderColor = '#5C5E60',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.22266"
        y="4.76331"
        width="15.5"
        height="15.5"
        rx="3.25"
        fill={color}
        stroke={borderColor}
        strokeWidth="1.5"
      />
      <polyline
        points="8.5 13.5 11 16 17 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
CheckboxIcon.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  color: Proptypes.string,
  borderColor: Proptypes.string,
};

export default CheckboxIcon;
