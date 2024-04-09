import React from 'react';
import PropTypes from 'prop-types';

export default function SubmitArrow({ size, color }) {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.375 18.4453L15.375 12.4453L9.375 6.44531"
          stroke="white"
          strokeWidth="2.5"
          //   stroke-linecap="round"
          //   stroke-linejoin="round"
        />
      </svg>
    </>
  );
}

SubmitArrow.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
