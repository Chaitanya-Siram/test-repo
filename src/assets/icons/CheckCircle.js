import React from 'react';
import Proptypes from 'prop-types';

const CheckCircle = ({ height = '1rem', width = '1rem', fill = '#33D68F' }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check-circle">
          <circle
            id="Ellipse 264"
            cx="8.125"
            cy="8.30859"
            r="6.82617"
            fill={fill}
          />
          <path
            id="Vector"
            d="M11.6735 5.79395L7.125 10.6487L5.125 8.64865"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </>
  );
};

CheckCircle.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  fill: Proptypes.string,
};

export default CheckCircle;
