import React from 'react';
import PropTypes from 'prop-types';

const TagIcon = ({
  color = '#656B8A',
  width = '25',
  height = '25',
  fill,
  fill2,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0963 20.3928L13.096 20.3931C13.0009 20.4883 12.888 20.5638 12.7637 20.6153C12.6394 20.6668 12.5062 20.6934 12.3716 20.6934C12.237 20.6934 12.1038 20.6668 11.9795 20.6153C11.8552 20.5638 11.7423 20.4883 11.6472 20.3931L11.6466 20.3925L4.24756 13.0021V6.44336C4.24756 5.753 4.8072 5.19336 5.49756 5.19336H12.0565L19.4543 12.5911C19.4544 12.5913 19.4546 12.5915 19.4548 12.5917C19.6452 12.7835 19.752 13.0427 19.752 13.313C19.752 13.5832 19.6452 13.8425 19.4548 14.0343C19.4546 14.0345 19.4544 14.0346 19.4543 14.0348L13.0963 20.3928Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.94336H8.01"
        stroke={fill2}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

TagIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  fill2: PropTypes.string,
};

export default TagIcon;
