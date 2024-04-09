import styled from 'styled-components';

export const AdvancedComponentWrapper = styled.div`
  padding-top: 1rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GenerateButtonWrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const GenerateButton = styled.button`
  border: none;
  padding: 0.8125rem 1.25rem;
  border-radius: 0.5rem;
  background: var(--primary-8676-ff, #675ef2);
  color: var(--grey-white, #fff);
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  &:hover {
    cursor: pointer;
  }
`;
