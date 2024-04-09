import React from 'react';
import Proptypes from 'prop-types';

const AddUserIcon = ({ color = '#656B8A' }) => {
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
        <g clipPath="url(#clip0_6077_300154)">
          <path
            d="M14.834 13.9531H17.334C17.776 13.9531 18.1999 14.1287 18.5125 14.4413C18.8251 14.7538 19.0007 15.1778 19.0007 15.6198V21.4531C19.0007 21.1216 18.869 20.8037 18.6345 20.5692C18.4001 20.3348 18.0822 20.2031 17.7507 20.2031H14.834V13.9531Z"
            stroke="#675EF2"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.1667 13.9531H20.6667C20.2246 13.9531 19.8007 14.1287 19.4882 14.4413C19.1756 14.7538 19 15.1778 19 15.6198V21.4531C19 21.1216 19.1317 20.8037 19.3661 20.5692C19.6005 20.3348 19.9185 20.2031 20.25 20.2031H23.1667V13.9531Z"
            stroke="#675EF2"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6077_300154">
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

export default AddUserIcon;

AddUserIcon.propTypes = {
  color: Proptypes.string,
};
