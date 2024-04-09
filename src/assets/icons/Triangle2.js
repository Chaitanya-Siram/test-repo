import React from 'react';
import PropTypes from 'prop-types';

const Triangle2 = ({ fillColor = '#ED3F47' }) => {
  return (
    <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 12.5L14.4282 0.5H0.571797L7.5 12.5Z" fill={fillColor} />
    </svg>
  );
};

Triangle2.propTypes = {
  fillColor: PropTypes.string,
};

export default Triangle2;
