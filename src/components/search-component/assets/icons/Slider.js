import React from 'react';
import PropTypes from 'prop-types';

const Slider = ({ strokeColor = 'white' }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3105_115026)">
        <path
          d="M2.24967 2.61621L6.33301 2.61621"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.66667 2.61621L12.75 2.61621"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.25 7.2832L7.5 7.2832"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.83333 7.2832L12.75 7.2832"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.25033 11.9492L5.16699 11.9492"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 11.9492L12.75 11.9492"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.33301 0.866211L6.33301 4.36621"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.83301 5.5332L9.83301 9.0332"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.16699 10.1992L5.16699 13.6992"
          stroke={strokeColor}
          strokeWidth="1.20764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3105_115026">
          <rect
            width="14"
            height="14"
            fill={strokeColor}
            transform="translate(14.5 0.580078) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Slider;

Slider.propTypes = {
  strokeColor: PropTypes.string,
};
