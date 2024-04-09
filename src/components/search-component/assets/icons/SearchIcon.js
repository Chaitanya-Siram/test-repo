import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({ strokeColor = 'white', width = '22', height = '22' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9999 20.9984L16.6499 16.6484"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SearchIcon;

SearchIcon.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
