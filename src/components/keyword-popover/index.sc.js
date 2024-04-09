import styled from 'styled-components';

export const MainWrp = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.3125rem;
  border: 1px solid #f3f4f8;
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  padding: 1.8rem;
  display: flex;
  padding: 0.94rem;
  max-width: 12.5rem;
  gap: 0.5rem;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
`;
export const KeyWord = styled.div`
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
`;
