import styled, { keyframes } from 'styled-components';

export const animateLoader = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;
export const LoadingSpin = styled.div`
  border: 0.25rem solid #f3f3f3;
  border-top: ${({ theme }) => `0.25rem solid ${theme.primary}`};
  border-radius: 50%;
  width: 1.875rem;
  height: 1.875rem;
  animation: ${animateLoader} 1s linear infinite;
`;
