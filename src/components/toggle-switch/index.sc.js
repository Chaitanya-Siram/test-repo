import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: ${({ small }) => (small ? '1.31rem' : '1.75rem')};
  height: ${({ small }) => (small ? '0.75rem' : '1rem')};
  &,
  > * {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 1rem;
    box-sizing: border-box;
  }
`;

export const SwitchWrap = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  overflow: hidden;
  background-color: #a1a5b7;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled, checked }) => (disabled && checked ? 0.5 : 1)};
  background-color: ${({ checked, disabled, disabledColor, color, offColor }) =>
    checked ? color : disabled ? disabledColor : offColor};
  transition: all 0.3s linear;
  &:focus {
    outline: none;
  }
`;

export const Switch = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: inherit;
  border: ${({ small }) => (small ? '1.5px' : '2px')} solid transparent;
  transition: inherit;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: inherit;
    background-color: #fff;
    background-color: ${({ switchColor }) => switchColor};
    transform: translateX(${({ checked }) => (checked ? '49%' : '-49%')});
    transition: 0.3s all ease-out;
  }
  &:after {
    content: '';
    top: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: inherit;
    background-color: #000;
    opacity: 0;
    transition: inherit;
  }
  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        border-color: rgba(0, 0, 0, 0.1);
        &::after {
          opacity: 0.1;
        }
      `}
  }
`;
