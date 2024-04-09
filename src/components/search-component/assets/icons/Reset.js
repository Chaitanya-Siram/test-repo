import React from 'react';
import PropTypes from 'prop-types';

const ResetIcon = ({
  strokeColor = '#585858',
  width = '20',
  height = '20',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <mask
        id="mask0_3115_9125"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3115_9125)">
        <path
          d="M9.25 17.0001C7.76389 16.8056 6.51736 16.1494 5.51042 15.0313C4.50347 13.9133 4 12.5834 4 11.0417C4 10.1945 4.15972 9.40633 4.47917 8.67717C4.79861 7.948 5.23611 7.31258 5.79167 6.77091L6.85417 7.83342C6.4375 8.23619 6.10764 8.71536 5.86458 9.27092C5.62153 9.82647 5.5 10.4167 5.5 11.0417C5.5 12.1667 5.85764 13.139 6.57292 13.9584C7.28819 14.7779 8.18056 15.2848 9.25 15.4792V17.0001ZM10.75 17.0001V15.4792C11.8194 15.2987 12.7118 14.7952 13.4271 13.9688C14.1424 13.1424 14.5 12.1667 14.5 11.0417C14.5 9.79175 14.0625 8.72925 13.1875 7.85425C12.3125 6.97925 11.25 6.54175 10 6.54175H9.85417L10.8125 7.50008L9.75 8.54175L7 5.79175L9.75 3.04175L10.8125 4.10425L9.875 5.04175H10C11.6667 5.04175 13.0833 5.62508 14.25 6.79175C15.4167 7.95842 16 9.37508 16 11.0417C16 12.5834 15.4965 13.9167 14.4896 15.0417C13.4826 16.1667 12.2361 16.8195 10.75 17.0001Z"
          fill={strokeColor}
        />
      </g>
    </svg>
  );
};

export default ResetIcon;

ResetIcon.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
