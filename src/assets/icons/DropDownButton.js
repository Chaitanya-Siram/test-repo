import React from 'react';
import PropTypes from 'prop-types';

export default function DropDownButton({ size, color, isOpen, angle }) {
  const ArrowButtonStyle = {
    transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
    transition: 'transform 0.3s ease',
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={ArrowButtonStyle}
    >
      <path
        d="M3.76172 6.10547L7.51172 9.85547L11.2617 6.10547"
        stroke={color}
        strokeWidth="2"

        // stroke-linecap="round"
        // stroke-linejoin="round"
      />
    </svg>
  );
}

DropDownButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  isOpen: PropTypes.bool,
  angle: PropTypes.string,
};
