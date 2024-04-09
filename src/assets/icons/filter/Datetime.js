import React from 'react';
import PropTypes from 'prop-types';

const Datetime = ({ size = '1.25rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
    >
      <rect x="0.148438" y="0.236816" width={size} height={size} fill="white" />
      <path
        d="M16.6883 2.8797H15.8708V1.24463H14.2357V2.8797H6.06034V1.24463H4.42527V2.8797H3.60773C2.70844 2.8797 1.97266 3.61549 1.97266 4.51478V17.5954C1.97266 18.4947 2.70844 19.2305 3.60773 19.2305H16.6883C17.5876 19.2305 18.3234 18.4947 18.3234 17.5954V4.51478C18.3234 3.61549 17.5876 2.8797 16.6883 2.8797ZM16.6883 17.5954H3.60773V8.60247H16.6883V17.5954ZM16.6883 6.96739H3.60773V4.51478H16.6883V6.96739Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default Datetime;

Datetime.propTypes = {
  size: PropTypes.string,
};
