import React from 'react';
import Proptypes from 'prop-types';

const Info = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
    >
      <path
        d="M9.71875 17.1016C13.8609 17.1016 17.2188 13.7437 17.2188 9.60156C17.2188 5.45943 13.8609 2.10156 9.71875 2.10156C5.57661 2.10156 2.21875 5.45943 2.21875 9.60156C2.21875 13.7437 5.57661 17.1016 9.71875 17.1016Z"
        fill={color}
      />
      <path
        d="M9.71875 6.60156V9.60156"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.71875 12.6016H9.72625"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Info.propTypes = {
  color: Proptypes.string,
};

export default Info;
