import React from 'react';
import Proptypes from 'prop-types';

const AddBlue = ({ width = '14', height = '13', color = '#656B8A' }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 289833">
          <path
            id="Vector"
            d="M1.74817 7.19922H14.599"
            stroke={color}
            strokeWidth="1.50955"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M8.17358 0.774414V13.6252"
            stroke={color}
            strokeWidth="1.50955"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </>
  );
};

export default AddBlue;

AddBlue.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  color: Proptypes.string,
};
