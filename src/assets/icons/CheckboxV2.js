import React from 'react';
import Proptypes from 'prop-types';

export default function CheckboxV2({ width, color, borderColor }) {
  return (
    <svg
      width={width}
      height={width}
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
    </svg>
  );
}

CheckboxV2.propTypes = {
  width: Proptypes.string,
  color: Proptypes.string,
  borderColor: Proptypes.string,
};
