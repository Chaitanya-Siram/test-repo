import React from 'react';
import Proptypes from 'prop-types';

const SavedSearches = ({ width = '25', height = '25', fill = '#675EF2' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.597656 5.00012C0.597656 2.2387 2.83623 0.00012207 5.59766 0.00012207H19.5977C22.3591 0.00012207 24.5977 2.2387 24.5977 5.00012V19.0001C24.5977 21.7615 22.3591 24.0001 19.5977 24.0001H5.59766C2.83623 24.0001 0.597656 21.7615 0.597656 19.0001V5.00012Z"
        fill={fill}
      />
      <g clipPath="url(#clip0_7488_310879)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8671 12.6954V18.0005C17.8671 18.2267 17.7407 18.4339 17.5396 18.5374C17.3385 18.6409 17.0964 18.6234 16.9124 18.4919L12.5967 15.4092L8.28095 18.4919C8.0969 18.6234 7.85481 18.6409 7.65369 18.5374C7.45258 18.4339 7.32617 18.2267 7.32617 18.0005V7.33388C7.32617 6.82012 7.53026 6.32739 7.89355 5.96411C8.25684 5.60082 8.74956 5.39673 9.26332 5.39673H11.8316C11.5362 5.75929 11.2924 6.16557 11.1113 6.60436H9.26332C9.06984 6.60436 8.88429 6.68122 8.74748 6.81803C8.61067 6.95485 8.53381 7.1404 8.53381 7.33388V16.8272L12.2457 14.1759C12.4556 14.0259 12.7377 14.0259 12.9476 14.1759L16.6595 16.8272V13.1505C17.0864 13.0526 17.4917 12.8982 17.8671 12.6954Z"
          fill="white"
        />
        <g clipPath="url(#clip1_7488_310879)">
          <path
            d="M15.588 11.4821C17.2244 11.4821 18.5509 10.1555 18.5509 8.51912C18.5509 6.88272 17.2244 5.55615 15.588 5.55615C13.9516 5.55615 12.625 6.88272 12.625 8.51912C12.625 10.1555 13.9516 11.4821 15.588 11.4821Z"
            stroke="white"
            strokeWidth="1.20764"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.2928 12.2204L17.6816 10.6093"
            stroke="white"
            strokeWidth="1.20764"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_7488_310879">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(4.59766 4.00024)"
          />
        </clipPath>
        <clipPath id="clip1_7488_310879">
          <rect
            width="8.88889"
            height="8.88889"
            fill="white"
            transform="translate(11.5156 4.44397)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SavedSearches;

SavedSearches.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  fill: Proptypes.string,
};
