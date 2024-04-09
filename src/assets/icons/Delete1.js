import React from 'react';
import Proptypes from 'prop-types';

const Delete1 = ({ width = '18', height = '19', color = 'white' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 5.09375H3.75H15.75"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 5.09375V15.5938C14.25 15.9916 14.092 16.3731 13.8107 16.6544C13.5294 16.9357 13.1478 17.0938 12.75 17.0938H5.25C4.85218 17.0938 4.47064 16.9357 4.18934 16.6544C3.90804 16.3731 3.75 15.9916 3.75 15.5938V5.09375M6 5.09375V3.59375C6 3.19593 6.15804 2.81439 6.43934 2.53309C6.72064 2.25179 7.10218 2.09375 7.5 2.09375H10.5C10.8978 2.09375 11.2794 2.25179 11.5607 2.53309C11.842 2.81439 12 3.19593 12 3.59375V5.09375"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Delete1;

Delete1.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  color: Proptypes.string,
};
