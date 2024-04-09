import React from 'react';
import PropTypes from 'prop-types';

const SpamExclusion = ({ size = '1.25rem' }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6717 1.42188H6.32828L1.14062 6.60953V13.953L6.32828 19.1406H13.6717L18.8594 13.953V6.60953L13.6717 1.42188ZM16.8906 13.1359L12.8547 17.1719H7.14531L3.10938 13.1359V7.42656L7.14531 3.39062H12.8547L16.8906 7.42656V13.1359ZM9.99988 15.2031C10.5435 15.2031 10.9843 14.7624 10.9843 14.2188C10.9843 13.6751 10.5435 13.2344 9.99988 13.2344C9.45622 13.2344 9.0155 13.6751 9.0155 14.2188C9.0155 14.7624 9.45622 15.2031 9.99988 15.2031ZM10.9844 5.35938H9.01562V12.25H10.9844V5.35938Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default SpamExclusion;

SpamExclusion.propTypes = {
  size: PropTypes.string,
};
