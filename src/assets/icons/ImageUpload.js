import React from 'react';
import Proptypes from 'prop-types';

const ImageUploadIcon = ({ color = '#1C1B1F' }) => {
  return (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 14 14"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M1.5 14C1.0875 14 0.734375 13.8531 0.440625 13.5594C0.146875 13.2656 0 12.9125 0 12.5V1.5C0 1.0875 0.146875 0.734376 0.440625 0.440626C0.734375 0.146876 1.0875 0 1.5 0H8V1.5H1.5V12.5H12.5V6H14V12.5C14 12.9125 13.8531 13.2656 13.5594 13.5594C13.2656 13.8531 12.9125 14 12.5 14H1.5ZM11 4.5V3H9.5V1.5H11V0H12.5V1.5H14V3H12.5V4.5H11ZM2.5 11H11.5L8.5 7L6.25 10L4.75 8L2.5 11Z"
        fill={color}
      />
    </svg>
  );
};

ImageUploadIcon.propTypes = {
  color: Proptypes.string,
};

export default ImageUploadIcon;
