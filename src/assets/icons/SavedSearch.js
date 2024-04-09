import React from 'react';
import Proptypes from 'prop-types';

const SavedSearch = ({ width = '25', height = '25', fill = '#675EF2' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M0.948242 5.41406C0.948242 2.65264 3.18682 0.414062 5.94824 0.414062H19.9482C22.7097 0.414062 24.9482 2.65264 24.9482 5.41406V19.4141C24.9482 22.1755 22.7097 24.4141 19.9482 24.4141H5.94824C3.18682 24.4141 0.948242 22.1755 0.948242 19.4141V5.41406Z"
        fill={fill}
      />
      <path
        d="M7.9082 14.4609L12.9482 17.752L17.9883 14.4609"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.36035 10.7656H12.9482H18.5361"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.36035 7.07031H12.9482H18.5361"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SavedSearch;

SavedSearch.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  fill: Proptypes.string,
};
