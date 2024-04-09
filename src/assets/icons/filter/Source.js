import React from 'react';
import PropTypes from 'prop-types';

const Source = ({ size = '1.25rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <rect x="0.722656" width={size} height={size} fill="white" />
      <path
        d="M10.7138 16.2257L4.16266 11.1323L2.72266 12.2523L10.7227 18.4745L18.7227 12.2523L17.2738 11.1234L10.7138 16.2257ZM10.7227 13.9679L17.2649 8.87455L18.7227 7.74566L10.7227 1.52344L2.72266 7.74566L4.17155 8.87455L10.7227 13.9679ZM10.7227 3.77233L15.8249 7.74566L10.7227 11.719L5.62043 7.74566L10.7227 3.77233Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default Source;

Source.propTypes = {
  size: PropTypes.string,
};
