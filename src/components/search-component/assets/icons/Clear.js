import React from 'react';
import PropTypes from 'prop-types';

const ClearIcon = ({
  strokeColor = '#3D5E73',
  width = '14',
  height = '14',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.999 1.41033L12.5887 0L6.99896 5.59019L1.41023 0L0 1.41033L5.58977 7.00052L0 12.5897L1.41023 14L7 8.40981L12.5898 14L14 12.5897L8.41023 6.99948L13.999 1.41033Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default ClearIcon;

ClearIcon.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
