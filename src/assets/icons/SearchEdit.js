import React from 'react';
import Proptypes from 'prop-types';

const SearchEdit = ({ width = '25', height = '25', color = '#ffffff' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5396 20.6172H21.5396"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0396 4.11741C17.4374 3.71959 17.9769 3.49609 18.5396 3.49609C18.8181 3.49609 19.094 3.55096 19.3513 3.65757C19.6087 3.76418 19.8426 3.92043 20.0396 4.11741C20.2365 4.3144 20.3928 4.54825 20.4994 4.80562C20.606 5.06299 20.6609 5.33884 20.6609 5.61741C20.6609 5.89599 20.606 6.17184 20.4994 6.42921C20.3928 6.68658 20.2365 6.92043 20.0396 7.11741L7.53955 19.6174L3.53955 20.6174L4.53955 16.6174L17.0396 4.11741Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchEdit;

SearchEdit.propTypes = {
  width: Proptypes.string,
  height: Proptypes.string,
  color: Proptypes.string,
};
