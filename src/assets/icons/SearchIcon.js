import React from 'react';
import Proptypes from 'prop-types';

export const SearchIcon = ({ height = '1.15rem', width = '1.15rem' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M9.50003 16.8682C13.9183 16.8682 17.5001 13.2865 17.5001 8.8682C17.5001 4.4499 13.9183 0.868164 9.50003 0.868164C5.08174 0.868164 1.5 4.4499 1.5 8.8682C1.5 13.2865 5.08174 16.8682 9.50003 16.8682Z"
          stroke="#5C5E60"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4999 18.8686L15.1499 14.5186"
          stroke="#5C5E60"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
SearchIcon.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  fill: Proptypes.string,
};
