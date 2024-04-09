import React from 'react';
import Proptypes from 'prop-types';

const NpLeftSidebar = ({ color = '#675EF2', width = '35', height = '34' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {color === '#675EF2' && (
        <g filter="url(#filter0_d_10102_206388)">
          <path
            d="M30.4648 23C30.4648 25.7614 28.2263 28 25.4648 28L9.00029 28C6.23887 28 4.00029 25.7614 4.00029 23L4.00029 7C4.00029 4.23857 6.23887 2 9.00029 2L25.4648 2C28.2263 2 30.4648 4.23858 30.4648 7L30.4648 23Z"
            fill="white"
          />
        </g>
      )}
      <path
        d="M11.1299 22L23.37 22C23.7117 22 24 21.6763 24 21.2926L24 7.54947C24 7.16579 23.7117 6.8421 23.37 6.8421L11.1299 6.8421C10.7882 6.8421 10.4999 7.16579 10.4999 7.54947L10.4999 21.2926C10.4816 21.6763 10.7699 22 11.1299 22ZM22.8658 8.09495L22.8658 20.7265L19.4816 20.7265L19.4816 8.07433L22.8658 8.07512L22.8658 8.09495Z"
        fill={color}
      />
      <defs>
        <filter
          id="filter0_d_10102_206388"
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
            result="effect1_dropShadow_10102_206388"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10102_206388"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
NpLeftSidebar.propTypes = {
  color: Proptypes.string,
  width: Proptypes.string,
  height: Proptypes.string,
};
export default NpLeftSidebar;
