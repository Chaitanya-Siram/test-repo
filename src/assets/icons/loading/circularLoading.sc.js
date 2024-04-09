import styled, { keyframes } from 'styled-components';

export const load8Keyframes = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  border-radius: 50%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 8rem auto;
  font-size: ${({ size }) => size};
  position: relative;
  text-indent: -9999em;
  border-top: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-right: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-bottom: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}33`};
  border-left: ${({ theme, bgColor }) =>
    `1.1em solid ${bgColor || theme.primary}`};
  transform: translateZ(0);
  animation: ${load8Keyframes} 1.1s infinite linear;
`;
export const PageLoadingWrp = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
