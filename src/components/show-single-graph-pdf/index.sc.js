import styled from 'styled-components';

export const FullSlot = styled.div`
  width: 100%;
  height: 35rem;
  border-radius: ${({ theme }) => theme.primaryBorderRadius};
  padding: 1rem 1.25rem;
  background-color: #ffffff;
  cursor: pointer;
  z-index: ${({ selected }) => (selected ? 1 : null)};
`;
