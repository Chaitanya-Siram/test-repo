import React from 'react';
import Proptypes from 'prop-types';

const MoreOptions = ({ color }) => {
  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="more-vertical">
          <path
            id="Vector"
            d="M12.1055 13.8008C12.6578 13.8008 13.1055 13.3531 13.1055 12.8008C13.1055 12.2485 12.6578 11.8008 12.1055 11.8008C11.5532 11.8008 11.1055 12.2485 11.1055 12.8008C11.1055 13.3531 11.5532 13.8008 12.1055 13.8008Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M12.1055 6.80078C12.6578 6.80078 13.1055 6.35307 13.1055 5.80078C13.1055 5.2485 12.6578 4.80078 12.1055 4.80078C11.5532 4.80078 11.1055 5.2485 11.1055 5.80078C11.1055 6.35307 11.5532 6.80078 12.1055 6.80078Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M12.1055 20.8008C12.6578 20.8008 13.1055 20.3531 13.1055 19.8008C13.1055 19.2485 12.6578 18.8008 12.1055 18.8008C11.5532 18.8008 11.1055 19.2485 11.1055 19.8008C11.1055 20.3531 11.5532 20.8008 12.1055 20.8008Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </>
  );
};

export default MoreOptions;
MoreOptions.propTypes = {
  color: Proptypes.string,
};
