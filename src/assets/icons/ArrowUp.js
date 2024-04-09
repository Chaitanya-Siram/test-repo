import React from 'react';
import PropTypes from 'prop-types';

const ArrowUp = ({ color = '#00B929' }) => {
  return (
    <>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.57227 10.098V2.51465"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.78027 6.30631L7.57194 2.51465L11.3636 6.30631"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

ArrowUp.propTypes = {
  color: PropTypes.string,
};

export default ArrowUp;
