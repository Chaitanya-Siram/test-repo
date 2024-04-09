import React from 'react';
import Proptypes from 'prop-types';

const ListIcon2 = ({ color = '#656B8A', width = '35', height = '34' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {color !== '#656B8A' && (
        <g filter="url(#filter0_d_10102_206387)">
          <path
            d="M30.4648 23C30.4648 25.7614 28.2263 28 25.4648 28L9.00029 28C6.23887 28 4.00029 25.7614 4.00029 23L4.00029 7C4.00029 4.23857 6.23887 2 9.00029 2L25.4648 2C28.2263 2 30.4648 4.23858 30.4648 7L30.4648 23Z"
            fill="white"
          />
        </g>
      )}
      <path
        d="M20.2324 19.5054L10.4823 19.5054"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M20.2324 14.9541L10.4823 14.9541"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M20.2324 10.4026L10.4823 10.4026"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M23.9824 19.5054L23.9724 19.5054"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M23.9824 14.9541L23.9724 14.9541"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M23.9824 10.4026L23.9724 10.4026"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_10102_206387"
          x="0"
          y="0"
          width="34.4648"
          height="34"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10102_206387"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10102_206387"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
ListIcon2.propTypes = {
  color: Proptypes.string,
  height: Proptypes.string,
  width: Proptypes.string,
};

export default ListIcon2;
