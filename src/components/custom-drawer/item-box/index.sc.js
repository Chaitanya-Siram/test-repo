import styled from 'styled-components/macro';

export const ItemTypeBoxWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: ${({ border }) =>
    border === 'none' ? '0rem 1rem 1.25rem 1rem' : '1.25rem 1rem'};
  /* padding: 1.25rem 1rem; */
  /* border-radius: 0.625rem; */
  padding-bottom: 1rem;
  background: #ffffff;
  border-radius: ${({ border }) =>
    border === 'none' ? '0rem 0rem 0.625rem 0.625rem' : '0.625rem'};
`;

export const BoxWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ItemTypeWrp = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 2px;
`;
