import React from 'react';
import PropTypes from 'prop-types';

const BookmarkIcon = ({ activeColor = '#425DF8' }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4574 17.7398L10.6713 13.6069L4.88525 17.7398V4.51449C4.88525 4.07605 5.05943 3.65556 5.36945 3.34553C5.67948 3.0355 6.09997 2.86133 6.53842 2.86133H14.8042C15.2427 2.86133 15.6632 3.0355 15.9732 3.34553C16.2832 3.65556 16.4574 4.07605 16.4574 4.51449V17.7398Z"
        fill={activeColor}
        stroke={activeColor || '#D1D5DC'}
        strokeWidth="1.65316"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

BookmarkIcon.propTypes = {
  activeColor: PropTypes.string,
};

export default BookmarkIcon;
