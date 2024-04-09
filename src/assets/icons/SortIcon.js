import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SortIcon = ({ color = 'black', showRedDot = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define the colors for normal and hover states
  const normalColor = color;
  const hoverColor = '#675ef2'; // You can change this to your desired hover color
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
      onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
    >
      {showRedDot && (
        <>
          {/* Create a red bold circle in the top-right corner */}
          <circle
            cx="16.5" // Adjust the 'cx' attribute to control horizontal position
            cy="1.5" // Adjust the 'cy' attribute to control vertical position
            r="3.5" // Adjust the 'r' attribute to control the circle size
            fill="red"
            stroke="red" // No stroke to make it non-see-through
          />
        </>
      )}
      <path
        d="M6.00732 3.14844V13.6484"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9248 3.14844L16.2949 3.14844"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9248 6.27148H15.3274"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9248 9.39453H13.9541"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9248 12.5176H12.6101"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.95264 11.334L6.00684 14.2798L3.06104 11.334"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

SortIcon.propTypes = {
  color: PropTypes.string,
  showRedDot: PropTypes.bool,
};

export default SortIcon;
