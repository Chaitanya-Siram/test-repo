import React from 'react';
import PropTypes from 'prop-types';

const FileGrowIcon = ({ color = '#675EF2', size = 16 }) => {
  return (
    <svg
      width={size + 1}
      height={size}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.27679 9.05719L5.34946 9.98452L6.27679 9.05719ZM4.39118 9.05719L4.52653 9.19254L4.39118 9.05719ZM5.32471 9.99073L5.3272 9.99322L5.32471 9.99073Z"
        strokeWidth="4"
        fill={color || '#675EF2'}
        stroke={color || '#675EF2'}
      />
    </svg>
  );
};

FileGrowIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default FileGrowIcon;
