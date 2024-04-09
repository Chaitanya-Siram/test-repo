import styled from 'styled-components';

export const LegendWrp = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;
export const LegendContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const LegendBox = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ bgColor }) => bgColor || '#c3c7d9'};
`;
export const LegendLabel = styled.div`
  color: #5c5e60;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 0.5rem; /* 80% */
  letter-spacing: -0.0125rem;
  white-space: nowrap;
  text-transform: capitalize;
`;
