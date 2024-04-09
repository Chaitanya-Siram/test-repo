import React from 'react';
import Proptypes from 'prop-types';

const Delete = ({ size = '19', color = '#999999' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="ICONS">
        <path
          id="Vector"
          d="M8.30859 1.5791L7.55859 2.3291H3.05859V3.8291H3.89062L5.22803 15.271V15.2769C5.3263 16.0169 5.96883 16.5791 6.71484 16.5791H12.9009C13.6469 16.5791 14.2894 16.0168 14.3877 15.2769L14.3892 15.271L15.7266 3.8291H16.5586V2.3291H12.0586L11.3086 1.5791H8.30859ZM5.40234 3.8291H14.2148L12.9009 15.0791H6.71484L5.40234 3.8291Z"
          fill={color}
        />
        <g id="Vector_2">
          <path
            d="M7.78906 12.3075V5.57666H9.13523V12.9806H8.46214C8.0906 12.9806 7.78906 12.679 7.78906 12.3075Z"
            fill={color}
          />
          <path
            d="M10.4814 12.9806V5.57666H11.8276V12.3075C11.8276 12.679 11.526 12.9806 11.1545 12.9806H10.4814Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default Delete;

Delete.propTypes = {
  size: Proptypes.string,
  color: Proptypes.string,
};
