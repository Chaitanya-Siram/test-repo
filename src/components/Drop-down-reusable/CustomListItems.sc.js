import styled from 'styled-components';

export const Div = styled.div`
  padding-left: 1.5rem;
`;

export const ListItems = styled.li`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  margin: 0.38rem 0rem;
  font-size: 0.875rem;
  background: #f0f1f6;
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    transform: rotate(90deg) !important;
  }
`;
