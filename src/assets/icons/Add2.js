import React from 'react';
import PropTypes from 'prop-types';

export default function Add2({ height, color }) {
  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.77148 3.78125V12.5152"
        stroke={color}
        // stroke-width="1.5"
        // stroke-linecap="round"
        // stroke-linejoin="round"
      />
      <path
        d="M4.40479 8.14844H13.1387"
        stroke={color}
        // stroke-width="1.5"
        // stroke-linecap="round"
        // stroke-linejoin="round"
      />
    </svg>
  );
}
Add2.propTypes = {
  height: PropTypes.string,
  color: PropTypes.string,
};
