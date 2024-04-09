import React from 'react';
import PropTypes from 'prop-types';

const SaveSearchIcon = ({
  strokeColor = '#FFFFFF',
  width = '21',
  height = '21',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3096_99954)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.1812 11.1866V17.7784C17.1812 18.0046 17.0548 18.2118 16.8537 18.3153C16.6526 18.4188 16.4105 18.4012 16.2264 18.2697L10.7069 14.3272L5.18745 18.2697C5.00339 18.4012 4.7613 18.4188 4.56019 18.3153C4.35907 18.2118 4.23267 18.0046 4.23267 17.7784V4.36019C4.23267 3.75521 4.47299 3.175 4.90078 2.74722C5.32857 2.31943 5.90877 2.0791 6.51376 2.0791H9.62192C9.33886 2.45039 9.0976 2.85528 8.90519 3.28674H6.51376C6.22906 3.28674 5.95602 3.39983 5.75471 3.60115C5.5534 3.80246 5.4403 4.07549 5.4403 4.36019V16.605L10.356 13.0938C10.5659 12.9439 10.848 12.9439 11.0579 13.0938L15.9736 16.605V11.64C16.3956 11.5314 16.7999 11.3785 17.1812 11.1866Z"
          fill={strokeColor}
        />
        <g clipPath="url(#clip1_3096_99954)">
          <path
            d="M14.4721 9.57857C16.5307 9.57857 18.1994 7.90981 18.1994 5.8513C18.1994 3.79278 16.5307 2.12402 14.4721 2.12402C12.4136 2.12402 10.7449 3.79278 10.7449 5.8513C10.7449 7.90981 12.4136 9.57857 14.4721 9.57857Z"
            stroke={strokeColor}
            strokeWidth="1.20764"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.131 10.5101L17.1042 8.4834"
            stroke={strokeColor}
            strokeWidth="1.20764"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_3096_99954">
          <rect
            width="20.1273"
            height="20.1273"
            fill={strokeColor}
            transform="translate(0.643555 0.166992)"
          />
        </clipPath>
        <clipPath id="clip1_3096_99954">
          <rect
            width="11.1818"
            height="11.1818"
            fill={strokeColor}
            transform="translate(9.34692 0.726562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SaveSearchIcon;

SaveSearchIcon.propTypes = {
  strokeColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
