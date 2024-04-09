import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ComponentIcon = ({ color = '#656B8A', size = '1.875rem' }) => {
  // Create a state variable to track hover state
  const [isHovered, setIsHovered] = useState(false);

  // Define the colors for normal and hover states
  const normalColor = color;
  const hoverColor = '#fff'; // You can change this to your desired hover color
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
      onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
    >
      <path
        d="M11.5378 9.88541H13.8753C14.851 9.88541 15.6421 10.6764 15.6421 11.6522V15.6676C15.6421 15.7167 15.6023 15.7565 15.5531 15.7565H11.5378C10.562 15.7565 9.77098 14.9655 9.77098 13.9897V11.6522C9.77098 10.6764 10.562 9.88541 11.5378 9.88541ZM23.622 8.86719C24.5977 8.86719 25.3888 9.65822 25.3888 10.634V13.9897C25.3888 14.9655 24.5977 15.7565 23.622 15.7565H18.5884C18.5393 15.7565 18.4994 15.7167 18.4994 15.6676V10.634C18.4994 9.65822 19.2905 8.86719 20.2662 8.86719H23.622ZM22.6082 24.3535H20.2662C19.2905 24.3535 18.4994 23.5624 18.4994 22.5867V18.5668C18.4994 18.5177 18.5393 18.4779 18.5884 18.4779H22.6082C23.584 18.4779 24.375 19.2689 24.375 20.2447V22.5867C24.375 23.5624 23.584 24.3535 22.6082 24.3535ZM10.5345 25.3672C9.55873 25.3672 8.7677 24.5762 8.7677 23.6004V20.2447C8.7677 19.2689 9.55873 18.4779 10.5345 18.4779H15.5681C15.6172 18.4779 15.657 18.5177 15.657 18.5668V23.6004C15.657 24.5762 14.866 25.3672 13.8902 25.3672H10.5345Z"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ComponentIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default ComponentIcon;
