import React from 'react';
import Proptypes from 'prop-types';

const Close = ({ width = '1.5rem', height = '1.5rem', color = '#ffffff' }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.6338 10.4707L10.6338 30.4707"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6338 10.4707L30.6338 30.4707"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default Close;

Close.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  color: Proptypes.string,
};
