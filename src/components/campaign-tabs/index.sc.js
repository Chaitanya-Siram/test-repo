import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 0.3rem;
`;

export const CustomTab = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  background: #ffffff;
  border-radius: 1.5625rem;
  padding: 0.5rem 1.25rem;
  color: var(--grey-grey-1, #656b8a);
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  border: 1px solid var(--border-2, #c3c7d9);
  &:hover {
    cursor: pointer;
  }
`;
