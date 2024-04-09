import React from 'react';
import PropTypes from 'prop-types';
const Arrow = ({ isOpen }) => {
  const arrowStyle = {
    transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
    transition: 'transform 0.3s ease',
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="6"
      viewBox="0 0 7 6"
      fill="none"
      style={arrowStyle}
    >
      <path
        d="M3.75781 5.05469L6.52841 0.472655L0.987208 0.472654L3.75781 5.05469Z"
        fill="#656B8A"
      />
    </svg>
  );
};
export default Arrow;
Arrow.propTypes = {
  fill: PropTypes.string,
  isOpen: PropTypes.bool,
  customStyle: PropTypes.object,
};
