import React, { useState } from 'react';
import PropTypes from 'prop-types';
const FilterIcon = ({ color = 'black' }) => {
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
      <g clipPath="url(#clip0_3625_23125)">
        <path
          d="M17.4321 2.25H2.43213L8.43213 9.345V14.25L11.4321 15.75V9.345L17.4321 2.25Z"
          stroke={isHovered ? hoverColor : normalColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3625_23125">
          <rect
            width="18"
            height="18"
            stroke={isHovered ? hoverColor : normalColor}
            transform="translate(0.931641)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

FilterIcon.propTypes = {
  color: PropTypes.string,
};

export default FilterIcon;
