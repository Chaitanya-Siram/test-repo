import React from 'react';
import PropTypes from 'prop-types';

const CutomIcon = ({ color = '#656B8A' }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3846_36322)">
        <path
          d="M2.86426 14.5993V9.93262"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.86426 7.26628V2.59961"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.19727 14.5996V8.59961"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.19727 5.93294V2.59961"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5303 14.5999V11.2666"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5303 8.59961V2.59961"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.864258 9.93262H4.86426"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.19727 5.93262H10.1973"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5303 11.2666H15.5303"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3846_36322">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.197266 0.599609)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

CutomIcon.propTypes = {
  color: PropTypes.string,
};

export default CutomIcon;
