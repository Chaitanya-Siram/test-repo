import React from 'react';
import PropTypes from 'prop-types';

const SaveIcon = ({ strokeColor = '#675EF2', width = '20', height = '21' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 17.7002H4.16667C3.72464 17.7002 3.30072 17.5246 2.98816 17.212C2.67559 16.8995 2.5 16.4756 2.5 16.0335V4.36686C2.5 3.92483 2.67559 3.50091 2.98816 3.18835C3.30072 2.87579 3.72464 2.7002 4.16667 2.7002H13.3333L17.5 6.86686V16.0335C17.5 16.4756 17.3244 16.8995 17.0118 17.212C16.6993 17.5246 16.2754 17.7002 15.8333 17.7002Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1663 17.7004V11.0337H5.83301V17.7004"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83301 2.7002V6.86686H12.4997"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SaveIcon;

SaveIcon.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
