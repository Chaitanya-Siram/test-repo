import React from 'react';
import PropTypes from 'prop-types';

const AddRemoveChart = ({ width = '1rem', height = '1rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5.61078 9.05719L4.68344 9.98452L5.61078 9.05719ZM3.72516 9.05719L3.86051 9.19254L3.72516 9.05719ZM4.65869 9.99073L4.66119 9.99322L4.65869 9.99073Z"
        fill="#675EF2"
        stroke="#675EF2"
        strokeWidth="4"
      />
    </svg>
  );
};

export default AddRemoveChart;

AddRemoveChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
