import styled from 'styled-components';

export const AddWrapper = styled.div`
  position: relative;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

export const Line = styled.div`
  height: 0.15rem;
  width: 100%;
  background-color: #5f39f8;
`;

export const Icon = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  left: 50%;
  top: -0.8rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme?.errorButtonBackground};
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: middle;
  background: ${({ theme }) => theme?.errorButtonBackground};
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    box-shadow: 1px 1px 1px #ffffff9e;
  }
  &::before {
    width: 2px;
    margin: 3px auto;
  }
  &::after {
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
  }
`;
