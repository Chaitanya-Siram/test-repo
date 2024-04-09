import React from 'react';
import PropTypes from 'prop-types';

const ArrowRight = ({ width = '19', height = '19', color = '#675EF2' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8117_427802)">
        <path
          d="M9.05859 3.03711L8.00109 4.09461L12.1861 8.28711H3.05859V9.78711H12.1861L8.00109 13.9796L9.05859 15.0371L15.0586 9.03711L9.05859 3.03711Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_8117_427802">
          <rect
            width="18"
            height="18"
            fill={color}
            transform="translate(0.0585938 0.0371094)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
ArrowRight.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default ArrowRight;
