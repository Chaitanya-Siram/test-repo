import React from 'react';
import Proptypes from 'prop-types';

const AddAnalystIcon = ({ color = '#656B8A' }) => {
  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 15.7031H8C6.93913 15.7031 5.92172 16.1246 5.17157 16.8747C4.42143 17.6248 4 18.6423 4 19.7031V21.7031"
          stroke="#675EF2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.7031C14.2091 11.7031 16 9.91226 16 7.70312C16 5.49399 14.2091 3.70312 12 3.70312C9.79086 3.70312 8 5.49399 8 7.70312C8 9.91226 9.79086 11.7031 12 11.7031Z"
          stroke="#675EF2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g clipPath="url(#clip0_6077_300142)">
          <g clipPath="url(#clip1_6077_300142)">
            <path
              d="M18.5833 20.6198C20.4243 20.6198 21.9167 19.1274 21.9167 17.2865C21.9167 15.4455 20.4243 13.9531 18.5833 13.9531C16.7424 13.9531 15.25 15.4455 15.25 17.2865C15.25 19.1274 16.7424 20.6198 18.5833 20.6198Z"
              stroke="#675EF2"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.75 21.4531L20.9375 19.6406"
              stroke="#675EF2"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6077_300142">
            <rect
              width="10"
              height="10"
              fill="white"
              transform="translate(14 12.7031)"
            />
          </clipPath>
          <clipPath id="clip1_6077_300142">
            <rect
              width="10"
              height="10"
              fill="white"
              transform="translate(14 12.7031)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default AddAnalystIcon;

AddAnalystIcon.propTypes = {
  color: Proptypes.string,
};
