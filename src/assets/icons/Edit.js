import React from 'react';
import Proptypes from 'prop-types';

const Edit = ({ size = '15', color = '#fff' }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 15 15"
        fill="none"
      >
        <g clipPath="url(#clip0_7999_388516)">
          <path
            d="M10.76 2.15805C10.9132 2.00484 11.0951 1.88331 11.2953 1.8004C11.4955 1.71748 11.71 1.6748 11.9267 1.6748C12.1433 1.6748 12.3579 1.71748 12.5581 1.8004C12.7582 1.88331 12.9401 2.00484 13.0933 2.15805C13.2465 2.31126 13.3681 2.49315 13.451 2.69332C13.5339 2.8935 13.5766 3.10805 13.5766 3.32472C13.5766 3.54139 13.5339 3.75594 13.451 3.95612C13.3681 4.15629 13.2465 4.33818 13.0933 4.49139L5.21834 12.3664L2.01001 13.2414L2.88501 10.0331L10.76 2.15805Z"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_7999_388516">
            <rect
              width="14"
              height="14"
              fill={color}
              transform="translate(0.84375 0.407715)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default Edit;

Edit.propTypes = {
  size: Proptypes.string,
  color: Proptypes.string,
};
