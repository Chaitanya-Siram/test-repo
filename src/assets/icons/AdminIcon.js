import React from 'react';
import Proptypes from 'prop-types';

const AdminIcon = ({
  height = '1.5rem',
  width = '1.5rem',
  color = '#656B8A',
}) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ICONS" clipPath="url(#clip0_6396_95861)">
          <path
            id="Vector"
            d="M10.2969 12.25V11.0833C10.2969 10.4645 10.051 9.871 9.61346 9.43342C9.17587 8.99583 8.58238 8.75 7.96354 8.75H3.88021C3.26137 8.75 2.66788 8.99583 2.23029 9.43342C1.79271 9.871 1.54688 10.4645 1.54688 11.0833V12.25"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M13.3746 1.99419C13.452 1.91677 13.5439 1.85536 13.6451 1.81346C13.7462 1.77156 13.8546 1.75 13.9641 1.75C14.0736 1.75 14.182 1.77156 14.2832 1.81346C14.3843 1.85536 14.4762 1.91677 14.5537 1.99419C14.6311 2.07161 14.6925 2.16352 14.7344 2.26467C14.7763 2.36582 14.7979 2.47424 14.7979 2.58372C14.7979 2.69321 14.7763 2.80162 14.7344 2.90277C14.6925 3.00392 14.6311 3.09583 14.5537 3.17325L10.5743 7.15258L8.95312 7.59473L9.39527 5.97352L13.3746 1.99419Z"
            fill={color}
          />
          <path
            id="Vector_3"
            d="M5.92122 6.41667C7.20989 6.41667 8.25456 5.372 8.25456 4.08333C8.25456 2.79467 7.20989 1.75 5.92122 1.75C4.63256 1.75 3.58789 2.79467 3.58789 4.08333C3.58789 5.372 4.63256 6.41667 5.92122 6.41667Z"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6396_95861">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(0.962891)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default AdminIcon;

AdminIcon.propTypes = {
  color: Proptypes.string,
  height: Proptypes.string,
  width: Proptypes.string,
};
