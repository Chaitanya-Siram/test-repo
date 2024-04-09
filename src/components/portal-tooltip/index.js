import React from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PortalTooltip = (props) => {
  if (!props.isOpen) {
    return null;
  }
  return reactDom.createPortal(
    <Container
      pos={props.pos}
      align={props.align}
      vAlign={props.vAlign}
      leftAlign={props.leftAlign}
      boxShadow={props.boxShadow}
      borderradius={props.borderRadius}
      isAlign={props?.isAlign}
    >
      {props.children}
    </Container>,
    document.getElementById('tooltip')
  );
};

export default PortalTooltip;

const Container = styled.div`
  transform: ${(props) =>
    props.align === 'left' ? 'translateX(-100%)' : 'translateX(0%)'};
  transform: ${(props) =>
    props.vAlign === 'top' ? 'translateY(-100%)' : 'translateY(0%)'};
  position: absolute;
  left: ${(props) =>
    props.align === 'left'
      ? props.isAlign ? props.pos.left - (props.leftAlign * 16 || 240) : props.pos.left - (props.leftAlign * 16 || 15)
      : props.pos.left + 15}px;
  top: ${(props) =>
    props.vAlign === 'top' ? props.pos.top - 15 : props.pos.top + 15}px;
  top: ${(props) => !props.vAlign && props.pos.top}px;
  z-index: 1001;
  overflow: hidden;
  background: #ffffff;
  box-shadow: ${({ boxShadow }) =>
    boxShadow || '0px 2.90418px 5.80835px rgba(88, 88, 88, 0.3)'};
  border-radius: ${({ borderRadius }) => borderRadius || '8.71253px'};
  width: fit-content;
`;

PortalTooltip.propTypes = {
  isOpen: PropTypes.bool,
  pos: PropTypes.object,
  align: PropTypes.string,
  vAlign: PropTypes.string,
  children: PropTypes.node,
  leftAlign: PropTypes.number,
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  isAlign: PropTypes.bool,
};
