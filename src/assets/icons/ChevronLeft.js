import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = ({ color = '#675EF2' }) => {
  return (
    <>
      <svg
        width="0.938rem"
        height="0.938rem"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.67822 11.543L5.17822 7.04297L9.67822 2.54297"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

ChevronLeft.propTypes = {
  color: PropTypes.string,
};

export default ChevronLeft;
