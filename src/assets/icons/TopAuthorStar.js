import React from 'react';
import PropTypes from 'prop-types';

const TopAuthorStar = ({
  color = '#675ef2',
  height = '1rem',
  width = '1rem',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="star">
        <path
          id="Vector"
          d="M8.00065 2.5957L9.73475 6.1088L13.6126 6.67561L10.8066 9.40865L11.4689 13.2697L8.00065 11.4458L4.53245 13.2697L5.19466 9.40865L2.38867 6.67561L6.26655 6.1088L8.00065 2.5957Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
TopAuthorStar.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default TopAuthorStar;
