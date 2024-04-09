import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCanvasIcon = ({ color = '#ffffff' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define the colors for normal and hover states
  const normalColor = color;
  const hoverColor = '#675ef2';
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d="M4.15935 2.77634H6.20162C7.00182 2.77634 7.65054 3.42505 7.65054 4.22526V7.71645H4.15935C3.35914 7.71645 2.71043 7.06773 2.71043 6.26753V4.22526C2.71043 3.42505 3.35914 2.77634 4.15935 2.77634ZM14.7173 1.88672C15.5175 1.88672 16.1662 2.53543 16.1662 3.33564V6.26753C16.1662 7.06773 15.5175 7.71645 14.7173 7.71645H10.3365V3.33564C10.3365 2.53543 10.9852 1.88672 11.7854 1.88672H14.7173ZM3.28278 16.1133C2.48257 16.1133 1.83386 15.4646 1.83386 14.6644V11.7325C1.83386 10.9323 2.48257 10.2836 3.28278 10.2836H7.66359V14.6644C7.66359 15.4646 7.01488 16.1133 6.21467 16.1133H3.28278Z"
        stroke={isHovered ? hoverColor : normalColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4221 10.084V12.4226H10.0835V13.5919H12.4221V15.9305H13.5914V13.5919H15.9301V12.4226H13.5914V10.084H12.4221Z"
        fill={isHovered ? hoverColor : normalColor}
      />
    </svg>
  );
};

AddCanvasIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default AddCanvasIcon;
