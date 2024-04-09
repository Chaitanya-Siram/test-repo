import React from 'react';
import PropTypes from 'prop-types';

const Keyword = ({ size = '1.25rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
    >
      <rect y="0.28125" width={size} height={size} fill="white" />
      <path
        d="M9.7563 13.1123H11.5761L7.12674 1.79297H5.50721L1.05786 13.1123H2.87766L3.85286 10.5001H8.76369L9.7563 13.1123ZM4.5146 8.75869L6.31698 3.95234L8.11936 8.75869H4.5146ZM17.7146 9.27241L10.6706 16.3165L7.47503 13.1123L6.24732 14.34L10.6793 18.7719L18.9423 10.5001L17.7146 9.27241Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default Keyword;

Keyword.propTypes = {
  size: PropTypes.string,
};
