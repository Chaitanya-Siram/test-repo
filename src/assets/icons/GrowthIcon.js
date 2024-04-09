import React from 'react';
import PropTypes from 'prop-types';

const GrowthIcon = ({ color = '#585858', width = '25', height = '25' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.03957 12.9433C2.03957 18.4766 6.50245 22.956 12 22.956C17.4976 22.956 21.9604 18.4766 21.9604 12.9433C21.9604 7.41005 17.4976 2.93066 12 2.93066C6.50245 2.93066 2.03957 7.41005 2.03957 12.9433Z"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.979 16.155L10.842 12.5434L12.4541 14.1453L16.9693 9.95507"
        stroke={color}
        strokeWidth="1.28035"
      />
      <path
        d="M12.0222 9.73047H17.0216V14.7299"
        stroke={color}
        strokeWidth="1.28035"
      />
    </svg>
  );
};

GrowthIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default GrowthIcon;
