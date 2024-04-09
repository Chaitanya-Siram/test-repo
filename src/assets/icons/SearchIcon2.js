import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchIcon2 = ({ color = 'black', width = '19', height = '18' }) => {
  // Create a state variable to track hover state
  const [isHovered, setIsHovered] = useState(false);

  // Define the colors for normal and hover states
  const normalColor = color;
  const hoverColor = '#675ef2'; // You can change this to your desired hover color

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
      onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
    >
      <path
        d="M9.18164 14.25C12.4953 14.25 15.1816 11.5637 15.1816 8.25C15.1816 4.93629 12.4953 2.25 9.18164 2.25C5.86793 2.25 3.18164 4.93629 3.18164 8.25C3.18164 11.5637 5.86793 14.25 9.18164 14.25Z"
        stroke={isHovered ? hoverColor : normalColor} // Change the stroke color based on hover state
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6814 15.7498L13.4189 12.4873"
        stroke={isHovered ? hoverColor : normalColor} // Change the stroke color based on hover state
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

SearchIcon2.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SearchIcon2;
