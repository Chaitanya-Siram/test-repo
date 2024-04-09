import React from 'react';
import Proptypes from 'prop-types';

const Alert = ({ width = '40', height = '40', color = '#FFCC00' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.7302 6.32169C20.9599 4.99112 19.0388 4.99112 18.2685 6.32169L3.40406 31.9966C2.63213 33.33 3.59425 34.9987 5.13491 34.9987H34.8638C36.4044 34.9987 37.3666 33.33 36.5946 31.9966L21.7302 6.32169Z"
        fill={color}
      />
      <path d="M18.334 26.666H21.6673V29.9993H18.334V26.666Z" fill="white" />
      <path d="M18.334 16.666H21.6673V23.3327H18.334V16.666Z" fill="white" />
    </svg>
  );
};

export default Alert;
Alert.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  color: Proptypes.string,
};
