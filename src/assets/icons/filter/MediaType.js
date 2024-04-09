import React from 'react';
import PropTypes from 'prop-types';

const MediaType = ({ size = '1.25rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <rect x="0.894531" width={size} height={size} fill="white" />
      <path
        d="M17.44 3H4.34908C3.54908 3 2.89453 3.65455 2.89453 4.45455V14.6364C2.89453 15.4364 3.54908 16.0909 4.34908 16.0909H17.44C18.24 16.0909 18.8945 15.4364 18.8945 14.6364V4.45455C18.8945 3.65455 18.24 3 17.44 3ZM17.44 14.6364H4.34908V4.45455H17.44V14.6364ZM5.80362 11.7273H15.9854V13.9091H5.80362V11.7273Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default MediaType;

MediaType.propTypes = {
  size: PropTypes.string,
};
