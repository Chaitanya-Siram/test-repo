import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeft = ({
  color = '#555555',
  width = '21',
  height = '21',
  rotateAng,
}) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      rotate={rotateAng || 0}
    >
      <path
        d="M4.51351 10.1777L16.1802 10.1777"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3468 4.34407L16.1802 10.1774L10.3468 16.0107"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ArrowLeft.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  rotateAng: PropTypes.string,
};

export default ArrowLeft;
