import React from 'react';
import Proptypes from 'prop-types';
import styled, { css } from 'styled-components';

const DownPolygon = ({
  fill,
  isOpen = false,
  height = '0.5rem',
  width = '0.5rem',
}) => {
  return (
    <SvgContainer isOpen={isOpen}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 8 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Polygon 4"
          d="M4 6.69531L0.535898 0.695312L7.4641 0.695312L4 6.69531Z"
          fill={fill}
        />
      </svg>
    </SvgContainer>
  );
};

DownPolygon.propTypes = {
  fill: Proptypes.string,
  isOpen: Proptypes.bool,
  height: Proptypes.string,
  width: Proptypes.string,
};

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s ease;
    ${(props) =>
      props.isOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

export default DownPolygon;
