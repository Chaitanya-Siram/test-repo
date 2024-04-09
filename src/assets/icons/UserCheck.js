import React from 'react';
import Proptypes from 'prop-types';

export const UserCheck = ({ strokeColor = 'black' }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="user-check" clipPath="url(#clip0_4962_293899)">
        <path
          id="Vector"
          d="M9.40625 12.5508V11.3841C9.40625 10.7653 9.16042 10.1718 8.72283 9.7342C8.28525 9.29661 7.69175 9.05078 7.07292 9.05078H2.98958C2.37074 9.05078 1.77725 9.29661 1.33967 9.7342C0.902083 10.1718 0.65625 10.7653 0.65625 11.3841V12.5508"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5.03255 6.71745C6.32122 6.71745 7.36589 5.67278 7.36589 4.38411C7.36589 3.09545 6.32122 2.05078 5.03255 2.05078C3.74389 2.05078 2.69922 3.09545 2.69922 4.38411C2.69922 5.67278 3.74389 6.71745 5.03255 6.71745Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M9.99219 6.71745L11.1589 7.88411L13.4922 5.55078"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4962_293899">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.0742188 0.300781)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

UserCheck.propTypes = {
  strokeColor: Proptypes.string,
};
